import { NextRequest } from 'next/server';
import { verifyAuth } from '@/lib/auth';
import connectToDatabase from '@/lib/db';
import Notebook from '@/models/Notebook';
import { successResponse, errorResponse } from '@/lib/api-response';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await connectToDatabase();
        const { id } = await params;
        const auth = await verifyAuth(req);
        if (!auth.success) return errorResponse('Unauthorized', 401);

        const notebook = await Notebook.findOne({ _id: id, userId: auth.userId });
        if (!notebook) return errorResponse('Notebook not found', 404);

        return successResponse(notebook);
    } catch (error: any) {
        return errorResponse('Internal Server Error', 500, error);
    }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await connectToDatabase();
        const { id } = await params;
        const auth = await verifyAuth(req);
        if (!auth.success) return errorResponse('Unauthorized', 401);

        const body = await req.json();
        const notebook = await Notebook.findOneAndUpdate(
            { _id: id, userId: auth.userId },
            {
                ...body,
                updatedAt: new Date()
            },
            { new: true }
        );

        if (!notebook) return errorResponse('Notebook not found', 404);

        return successResponse(notebook, 'Notebook updated');
    } catch (error: any) {
        return errorResponse('Internal Server Error', 500, error);
    }
}
