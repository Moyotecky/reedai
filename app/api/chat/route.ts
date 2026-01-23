import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
    const { messages } = await req.json();

    const result = await streamText({
        model: openai('gpt-4o-mini'),
        messages,
        system: "You are ReedAI, an expert academic tutor. Help the student with their study questions effectively and concisely. Use formatting like bolding and lists to make answers clear.",
    });

    return result.toTextStreamResponse();
}
