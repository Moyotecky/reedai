import { NextRequest } from 'next/server';
import { verifyAuth } from '@/lib/auth';
import connectToDatabase from '@/lib/db';
import Task from '@/models/Task';
import { successResponse, errorResponse } from '@/lib/api-response';

export async function GET(req: NextRequest) {
    try {
        await connectToDatabase();
        const auth = await verifyAuth(req);
        if (!auth.success) return errorResponse('Unauthorized', 401);

        const tasks = await Task.find({ userId: auth.userId }).sort({ createdAt: -1 });
        return successResponse(tasks);
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

        // AI Suggestion Logic could go here or be a separate service. 
        // For now, allow Manual Creation

        const task = await Task.create({
            ...body,
            userId: auth.userId
        });

        return successResponse(task, 'Task created', 201);
    } catch (error: any) {
        return errorResponse('Internal Server Error', 500, error);
    }
}

export async function PUT(req: NextRequest) {
    try {
        await connectToDatabase();
        const auth = await verifyAuth(req);
        if (!auth.success) return errorResponse('Unauthorized', 401);

        const body = await req.json();
        const { id, status } = body;

        const task = await Task.findOneAndUpdate(
            { _id: id, userId: auth.userId },
            { status, updatedAt: new Date() },
            { new: true }
        );

        if (!task) return errorResponse('Task not found', 404);

        return successResponse(task, 'Task updated');
    } catch (error: any) {
        return errorResponse('Internal Server Error', 500, error);
    }
}
