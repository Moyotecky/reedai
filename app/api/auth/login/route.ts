import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import connectToDatabase from '@/lib/db';
import User from '@/models/User';
import { verifyPassword, signToken } from '@/lib/auth';
import { successResponse, errorResponse } from '@/lib/api-response';

export async function POST(req: NextRequest) {
    try {
        await connectToDatabase();

        const body = await req.json();
        const { email, password } = body;

        if (!email || !password) {
            return errorResponse('Please provide email and password', 400);
        }

        // Find user (+ passwordHash)
        const user = await User.findOne({ email }).select('+passwordHash');

        if (!user) {
            return errorResponse('Invalid credentials', 401);
        }

        // Verify Password
        const isValid = await verifyPassword(password, user.passwordHash);

        if (!isValid) {
            return errorResponse('Invalid credentials', 401);
        }

        // Generate Token
        const token = signToken({
            userId: user._id as string,
            email: user.email,
            role: user.role,
        });

        // Set Cookie
        cookies().set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60, // 7 days
            path: '/',
        });

        return successResponse({
            token,
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                username: user.username,
                credits: user.credits,
                avatar: user.avatar,
                role: user.role,
            }
        }, 'Login successful');

    } catch (error: any) {
        console.error('Login Error:', error);
        return errorResponse('Internal Server Error', 500, error);
    }
}
