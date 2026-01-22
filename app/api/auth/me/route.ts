import { NextRequest } from 'next/server';
import connectToDatabase from '@/lib/db';
import User from '@/models/User';
import { verifyToken } from '@/lib/auth';
import { successResponse, errorResponse } from '@/lib/api-response';

export async function GET(req: NextRequest) {
    try {
        await connectToDatabase();

        // Get Token from Header
        const authHeader = req.headers.get('authorization');

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return errorResponse('Not authorized', 401);
        }

        const token = authHeader.split(' ')[1];
        const payload = verifyToken(token);

        if (!payload) {
            return errorResponse('Invalid or expired token', 401);
        }

        // Fetch User
        const user = await User.findById(payload.userId);

        if (!user) {
            return errorResponse('User not found', 404);
        }

        return successResponse({
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                username: user.username,
                displayName: user.displayName,
                avatar: user.avatar,
                credits: user.credits,
                preferences: user.preferences,
                role: user.role,
            }
        }, 'User profile fetched successfully');

    } catch (error: any) {
        console.error('Profile Error:', error);
        return errorResponse('Internal Server Error', 500, error);
    }
}
