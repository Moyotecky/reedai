import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import connectToDatabase from '@/lib/db';
import Transaction from '@/models/Transaction';
import User from '@/models/User';

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

export async function POST(req: NextRequest) {
    try {
        if (!PAYSTACK_SECRET_KEY) {
            console.error('PAYSTACK_SECRET_KEY is not defined');
            return NextResponse.json({ message: 'Server configuration error' }, { status: 500 });
        }

        const body = await req.text(); // Get raw body for signature verification
        const hash = crypto.createHmac('sha512', PAYSTACK_SECRET_KEY).update(body).digest('hex');

        const signature = req.headers.get('x-paystack-signature');

        if (hash !== signature) {
            return NextResponse.json({ message: 'Invalid signature' }, { status: 400 });
        }

        const event = JSON.parse(body);

        await connectToDatabase();

        if (event.event === 'charge.success') {
            const { reference, status } = event.data;
            const { credits, userId } = event.data.metadata;

            // 1. Find Transaction
            const transaction = await Transaction.findOne({ reference });

            if (!transaction) {
                // If transaction not found, log it (or create it if you permit webhook-first creation)
                console.warn(`Transaction with reference ${reference} not found`);
                return NextResponse.json({ message: 'Transaction not found' }, { status: 404 });
            }

            if (transaction.status === 'success') {
                return NextResponse.json({ message: 'Transaction already processed' }, { status: 200 });
            }

            // 2. Update Transaction Status
            transaction.status = 'success';
            await transaction.save();

            // 3. Update User Credits Atomically
            const user = await User.findByIdAndUpdate(userId, {
                $inc: { credits: Number(credits) }
            });

            // Send Email
            if (user) {
                import('@/lib/email').then(({ sendEmail }) => {
                    sendEmail({
                        to: user.email,
                        subject: 'Payment Successful Receipt',
                        template: {
                            type: 'purchase-success',
                            name: user.name || 'User',
                            credits: Number(credits),
                            amount: (event.data.amount / 100).toLocaleString('en-NG', { style: 'currency', currency: 'NGN' }),
                            reference
                        }
                    }).catch((err: any) => console.error('Failed to send payment email', err));
                });
            }

            return NextResponse.json({ message: 'Payment verified and credits updated' }, { status: 200 });
        }

        return NextResponse.json({ message: 'Event received' }, { status: 200 });

    } catch (error: any) {
        console.error('Webhook Error:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
