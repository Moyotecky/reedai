import { NextRequest } from 'next/server';
import connectToDatabase from '@/lib/db';
import Transaction from '@/models/Transaction';
import { verifyToken } from '@/lib/auth';
import { successResponse, errorResponse } from '@/lib/api-response';

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

if (!PAYSTACK_SECRET_KEY) {
    // throw new Error('PAYSTACK_SECRET_KEY is not defined');
    console.warn('PAYSTACK_SECRET_KEY is not defined');
}

export async function POST(req: NextRequest) {
    try {
        await connectToDatabase();

        // 1. Authenticate User
        const token = req.cookies.get('token')?.value || req.headers.get('authorization')?.split(' ')[1];

        if (!token) {
            return errorResponse('Not authorized', 401);
        }

        const payload = verifyToken(token);
        if (!payload) {
            return errorResponse('Invalid token', 401);
        }

        const body = await req.json();
        const { packId, amount, credits } = body;
        // Amount should be in Kobo? Paystack takes Kobo.
        // Frontend should probably send ID, and backend looks up price to avoid tampering.
        // For MVP flexibility, we accept amount/credits but SHOULD validate against predefined packs.

        if (!packId || !amount || !credits) {
            return errorResponse('Missing payment details', 400);
        }

        // 2. Create Paystack Session
        // https://api.paystack.co/transaction/initialize
        const params = JSON.stringify({
            email: payload.email,
            amount: amount * 100, // Convert to Kobo if frontend sends Naira
            callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/credits`, // Redirect after payment
            metadata: {
                userId: payload.userId,
                packId,
                credits,
                cart_id: packId, // Helps in tracking
            }
        });

        const paystackRes = await fetch('https://api.paystack.co/transaction/initialize', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
                'Content-Type': 'application/json'
            },
            body: params
        }).then(res => res.json());

        if (!paystackRes.status) {
            return errorResponse('Failed to initialize payment with Paystack', 400, paystackRes.message);
        }

        // 3. Save Pending Transaction to DB
        await Transaction.create({
            userId: payload.userId,
            amount: amount * 100, // stored in Kobo
            credits,
            reference: paystackRes.data.reference,
            status: 'pending',
            packId,
        });

        return successResponse({
            authorization_url: paystackRes.data.authorization_url,
            access_code: paystackRes.data.access_code,
            reference: paystackRes.data.reference
        }, 'Payment initialized successfully');

    } catch (error: any) {
        console.error('Payment Init Error:', error);
        return errorResponse('Internal Server Error', 500, error);
    }
}
