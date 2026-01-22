import { NextRequest } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { verifyToken } from '@/lib/auth';
import { successResponse, errorResponse } from '@/lib/api-response';

export async function GET(req: NextRequest) {
    try {
        // 1. Authenticate
        // 1. Authenticate (Cookie or Header)
        const token = req.cookies.get('token')?.value || req.headers.get('authorization')?.split(' ')[1];

        if (!token) {
            return errorResponse('Not authorized', 401);
        }

        const payload = verifyToken(token);
        if (!payload) {
            return errorResponse('Invalid token', 401);
        }

        const folder = 'reedai_uploads';
        const timestamp = Math.round((new Date).getTime() / 1000);

        // 2. Configure Cloudinary
        cloudinary.config({
            cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });

        // 3. Generate Signature
        // We sign the parameters we want to enforce. 
        // Using 'timestamp' and 'folder' is standard.
        const signature = cloudinary.utils.api_sign_request({
            timestamp: timestamp,
            folder: folder,
        }, process.env.CLOUDINARY_API_SECRET!);

        return successResponse({
            signature,
            timestamp,
            cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
            apiKey: process.env.CLOUDINARY_API_KEY,
            folder,
        }, 'Signature generated');

    } catch (error: any) {
        console.error('Cloudinary Signature Error:', error);
        return errorResponse('Internal Server Error', 500, error);
    }
}
