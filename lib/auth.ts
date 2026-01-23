import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error('Please define the JWT_SECRET environment variable inside .env.local');
}

export interface AccessTokenPayload {
    userId: string;
    email: string;
    role: string;
}

/**
 * Hash a password using bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

/**
 * Verify a password against a hash
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
}

/**
 * Sign a JWT token
 */
export function signToken(payload: AccessTokenPayload): string {
    return jwt.sign(payload, JWT_SECRET!, {
        expiresIn: '7d', // Access token valid for 7 days
    });
}

/**
 * Verify a JWT token
 */
export function verifyToken(token: string): AccessTokenPayload | null {
    try {
        return jwt.verify(token, JWT_SECRET!) as AccessTokenPayload;
    } catch (error) {
        return null;
    }
}

/**
 * Helper to verify auth from request cookies
 */
import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

export async function verifyAuth(req: NextRequest): Promise<{ success: boolean; userId?: string; role?: string; error?: string }> {
    const token = (await cookies()).get('token')?.value;

    if (!token) {
        return { success: false, error: 'No token provided' };
    }

    const payload = verifyToken(token);

    if (!payload) {
        return { success: false, error: 'Invalid token' };
    }

    return { success: true, userId: payload.userId, role: payload.role };
}
