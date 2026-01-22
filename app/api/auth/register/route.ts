import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import connectToDatabase from '@/lib/db';
import User from '@/models/User';
import { hashPassword, signToken } from '@/lib/auth';
import { successResponse, errorResponse } from '@/lib/api-response';

export async function POST(req: NextRequest) {
    try {
        await connectToDatabase();

        const body = await req.json();
        const { email, password, username, name } = body;

        // Validation
        if (!email || !password || !username || !name) {
            return errorResponse('Missing required fields', 400);
        }

        // Check if user exists
        const existingUser = await User.findOne({
            $or: [{ email }, { username }]
        });

        if (existingUser) {
            return errorResponse('User with this email or username already exists', 409);
        }

        // Hash password
        const passwordHash = await hashPassword(password);

        // Create User
        const user = await User.create({
            email,
            username,
            name,
            displayName: name.split(' ')[0], // Default display name
            passwordHash,
            credits: 100, // Sign up bonus
        });

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

        // Send Welcome Email (Async)
        import('@/lib/email').then(({ sendEmail }) => {
            sendEmail({
                to: user.email,
                subject: 'Welcome to ReedAI! 🚀',
                template: { type: 'welcome', name: user.name }
            }).catch((err: any) => console.error('Failed to send welcome email', err));
        });

        return successResponse({
            token,
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                credits: user.credits,
            }
        }, 'User registered successfully', 201);

    } catch (error: any) {
        console.error('Registration Error:', error);
        return errorResponse('Internal Server Error', 500, error);
    }
}
