import { NextRequest } from 'next/server';
import { AccessToken } from 'livekit-server-sdk';
import { verifyToken } from '@/lib/auth';
import { successResponse, errorResponse } from '@/lib/api-response';

export async function GET(req: NextRequest) {
    try {
        // 1. Authenticate User (Optional: You might want public rooms, but for tutoring, usually auth is required)
        const authHeader = req.headers.get('authorization');
        let userId = 'guest-' + Math.random().toString(36).substring(7);
        let username = 'Guest';

        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.split(' ')[1];
            const payload = verifyToken(token);
            if (payload) {
                userId = payload.userId;
                username = payload.email.split('@')[0]; // Or fetch name from DB if needed
            }
        }

        const roomName = req.nextUrl.searchParams.get('room') || 'quick-chat';

        if (!process.env.LIVEKIT_API_KEY || !process.env.LIVEKIT_API_SECRET) {
            return errorResponse('Server misconfiguration', 500);
        }

        // 2. Create Access Token
        const at = new AccessToken(
            process.env.LIVEKIT_API_KEY,
            process.env.LIVEKIT_API_SECRET,
            {
                identity: userId,
                name: username,
            }
        );

        // 3. Add Grants
        at.addGrant({
            roomJoin: true,
            room: roomName,
            canPublish: true,
            canSubscribe: true,
        });

        return successResponse({
            token: await at.toJwt(),
            serverUrl: process.env.LIVEKIT_URL,
        }, 'Token generated successfully');

    } catch (error: any) {
        console.error('LiveKit Token Error:', error);
        return errorResponse('Internal Server Error', 500, error);
    }
}
