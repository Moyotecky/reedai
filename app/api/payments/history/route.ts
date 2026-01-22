import { NextRequest } from 'next/server';
import connectToDatabase from '@/lib/db';
import Transaction from '@/models/Transaction';
import { verifyToken } from '@/lib/auth';
import { successResponse, errorResponse } from '@/lib/api-response';

export async function GET(req: NextRequest) {
    try {
        await connectToDatabase();

        // 1. Authenticate (Cookie or Header)
        const token = req.cookies.get('token')?.value || req.headers.get('authorization')?.split(' ')[1];

        if (!token) {
            return errorResponse('Not authorized', 401);
        }

        const payload = verifyToken(token);
        if (!payload) {
            return errorResponse('Invalid token', 401);
        }

        // 2. Fetch Transactions
        const transactions = await Transaction.find({ userId: payload.userId })
            .sort({ createdAt: -1 })
            .limit(50); // Limit to last 50 for now

        return successResponse(transactions, 'History fetched successfully');

    } catch (error: any) {
        console.error('Transactions History Error:', error);
        return errorResponse('Internal Server Error', 500, error);
    }
}
