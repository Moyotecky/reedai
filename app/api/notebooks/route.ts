import { NextRequest } from 'next/server';
import { verifyAuth } from '@/lib/auth'; // Ensure this exists or use verifyToken from middleware logic
import connectToDatabase from '@/lib/db';
import Notebook from '@/models/Notebook';
import { successResponse, errorResponse } from '@/lib/api-response';

export async function GET(req: NextRequest) {
    try {
        await connectToDatabase();

        const auth = await verifyAuth(req);
        if (!auth.success) {
            return errorResponse('Unauthorized', 401);
        }

        const notebooks = await Notebook.find({ userId: auth.userId })
            .sort({ createdAt: -1 })
            .limit(5);

        return successResponse(notebooks, 'Recent notebooks fetched');
    } catch (error: any) {
        console.error("Fetch Notebooks Error:", error);
        return errorResponse('Internal Server Error', 500, error);
    }
}
