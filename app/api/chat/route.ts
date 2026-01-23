import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { verifyToken } from '@/lib/auth';
import connectToDatabase from '@/lib/db';
import User from '@/models/User';
import { errorResponse } from '@/lib/api-response';

export const maxDuration = 30;

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        // 1. Authenticate
        const authHeader = req.headers.get('authorization');
        const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : req.headers.get('cookie')?.split('token=')[1]?.split(';')[0]; // Simple cookie parse fallback

        if (!token) {
            return new Response('Unauthorized', { status: 401 });
        }

        const payload = verifyToken(token);
        if (!payload) {
            return new Response('Invalid Token', { status: 401 });
        }

        await connectToDatabase();
        const user = await User.findById(payload.userId);

        if (!user) {
            return new Response('User not found', { status: 404 });
        }

        // 2. Check Credits
        if (user.credits < 1) {
            return new Response('Insufficient credits', { status: 403 });
        }

        // 3. Deduct Credits (1 per message for now)
        // user.credits = user.credits - 1;
        // await user.save();
        // For now, let's just deduct without streaming data back to avoid type errors
        await User.findByIdAndUpdate(user._id, { $inc: { credits: -1 } });

        const result = await streamText({
            model: openai('gpt-4o-mini'),
            messages,
            system: "You are ReedAI, an expert academic tutor. Help the student with their study questions effectively and concisely. Use formatting like bolding and lists to make answers clear.",
        });

        return result.toTextStreamResponse();

    } catch (error) {
        console.error('Chat API Error:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
}
