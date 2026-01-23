import { NextRequest } from 'next/server';
import connectToDatabase from '@/lib/db';
import User from '@/models/User';
import { verifyToken } from '@/lib/auth';
import { successResponse, errorResponse } from '@/lib/api-response';

export async function POST(req: NextRequest) {
    try {
        await connectToDatabase();

        // Auth Check
        const token = req.cookies.get('token')?.value;
        if (!token) return errorResponse('Not authorized', 401);

        const payload = verifyToken(token);
        if (!payload) return errorResponse('Invalid token', 401);

        const { name, username } = await req.json();

        if (!name || !username) {
            return errorResponse('Missing fields', 400);
        }

        // Check username uniqueness
        const existingUsername = await User.findOne({ username, _id: { $ne: payload.userId } });
        if (existingUsername) {
            return errorResponse('Username is taken', 409);
        }

        // Update User
        // Also grant initial credits if not given? (Already 0 in model, lets give 100 now if we want)
        // Or keep 0. Let's keep 0 but maybe mark onboarding complete if we had a flag.

        await User.findByIdAndUpdate(payload.userId, {
            name,
            username,
            credits: 100 // Grant welcome credits here after full completion
        });

        // Send Welcome Email (Now verified and profile set)
        try {
            const user = await User.findById(payload.userId); // Re-fetch for email
            if (user) {
                const { sendEmail } = await import('@/lib/email');
                await sendEmail({
                    to: user.email!,
                    subject: 'Welcome to ReedAI! 🚀',
                    template: { type: 'welcome', name: user.name || 'Scholar' }
                });
            }
        } catch (e) { console.error(e) }


        return successResponse({ name, username }, 'Onboarding complete');

    } catch (error: any) {
        console.error('Onboarding Error:', error);
        return errorResponse('Internal Server Error', 500, error);
    }
}
