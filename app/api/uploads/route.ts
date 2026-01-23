import { NextRequest } from 'next/server';
import { verifyAuth } from '@/lib/auth';
import connectToDatabase from '@/lib/db';
import File from '@/models/File';
import { successResponse, errorResponse } from '@/lib/api-response';

export async function GET(req: NextRequest) {
    try {
        await connectToDatabase();
        const auth = await verifyAuth(req);
        if (!auth.success) return errorResponse('Unauthorized', 401);

        const files = await File.find({ userId: auth.userId }).sort({ createdAt: -1 });
        return successResponse(files);
    } catch (error: any) {
        return errorResponse('Internal Server Error', 500, error);
    }
}

export async function POST(req: NextRequest) {
    try {
        await connectToDatabase();
        const auth = await verifyAuth(req);
        if (!auth.success) return errorResponse('Unauthorized', 401);

        const body = await req.json();
        // Validation could go here

        const file = await File.create({
            ...body,
            userId: auth.userId
        });

        return successResponse(file, 'File saved', 201);
    } catch (error: any) {
        return errorResponse('Internal Server Error', 500, error);
    }
}
