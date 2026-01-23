import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import connectToDatabase from '@/lib/db';
import User from '@/models/User';
import { signToken } from '@/lib/auth';
import { successResponse, errorResponse } from '@/lib/api-response';

export async function POST(req: NextRequest) {
    try {
        await connectToDatabase();
        const { email, otp } = await req.json();

        if (!email || !otp) {
            return errorResponse('Missing email or OTP', 400);
        }

        // Find user with password hash so we can verify if needed? No, just OTP.
        const user = await User.findOne({ email }).select('+verificationCode +verificationExpires +role');

        if (!user) {
            return errorResponse('User not found', 404);
        }

        if (user.isVerified) {
            return errorResponse('User already verified', 400);
        }

        if (user.verificationCode !== otp) {
            return errorResponse('Invalid verification code', 400);
        }

        if (user.verificationExpires && user.verificationExpires < new Date()) {
            return errorResponse('Verification code expired', 400);
        }

        // Mark verified
        user.isVerified = true;
        user.verificationCode = undefined;
        user.verificationExpires = undefined;
        await user.save();

        // Login (Generate Token)
        const token = signToken({
            userId: user._id.toString(),
            email: user.email,
            role: user.role,
        });

        (await cookies()).set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60, // 7 days
            path: '/',
        });

        return successResponse({ token }, 'Email verified successfully');

    } catch (error: any) {
        console.error('Verify Error:', error);
        return errorResponse('Internal Server Error', 500, error);
    }
}
