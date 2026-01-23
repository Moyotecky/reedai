import { NextRequest } from 'next/server';
import connectToDatabase from '@/lib/db';
import User from '@/models/User';
import { hashPassword } from '@/lib/auth';
import { successResponse, errorResponse } from '@/lib/api-response';

export async function POST(req: NextRequest) {
    try {
        await connectToDatabase();

        const body = await req.json();
        const { email, password } = body;

        // Validation - Only Email/Pw
        if (!email || !password) {
            return errorResponse('Missing required fields', 400);
        }

        // Check if user exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            // If exists but not verified, we could resend OTP? 
            // For now simpler: Conflict.
            return errorResponse('User with this email already exists', 409);
        }

        // Hash password
        const passwordHash = await hashPassword(password);

        // Generate OTP
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        const verificationExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 mins

        // Create User (Unverified)
        const user = await User.create({
            email,
            passwordHash,
            isVerified: false,
            verificationCode,
            verificationExpires,
            username: `user_${Date.now()}`, // Temp username needed for uniqueness
            name: 'New User', // Temp name
            credits: 0,
        });

        // Send OTP Email
        try {
            const { sendEmail } = await import('@/lib/email');
            await sendEmail({
                to: email,
                subject: 'Verify your ReedAI Account',
                template: { type: 'otp', otp: verificationCode }
            });
        } catch (emailError) {
            console.error("Failed to send OTP email", emailError);
            // Optionally rollback user creation or just return success with warning?
            // Safer to return success but log error heavily. User can request resend later.
        }

        return successResponse({
            email: user.email,
            id: user._id
        }, 'Account created. Please verify your email.', 201);

    } catch (error: any) {
        console.error('Registration Error:', error);
        return errorResponse('Internal Server Error', 500, error);
    }
}
