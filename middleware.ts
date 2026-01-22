import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(req: NextRequest) {
    // 1. Check if route is protected
    if (req.nextUrl.pathname.startsWith('/dashboard') || req.nextUrl.pathname.startsWith('/call')) {

        const token = req.cookies.get('token')?.value;

        if (!token) {
            // Redirect to login if no token
            const loginUrl = new URL('/auth/login', req.url);
            loginUrl.searchParams.set('callbackUrl', req.nextUrl.pathname);
            return NextResponse.redirect(loginUrl);
        }

        try {
            // 2. Verify Token (Edge compatible)
            const secret = new TextEncoder().encode(process.env.JWT_SECRET);
            await jwtVerify(token, secret);

            // Token is valid, allow request
            return NextResponse.next();

        } catch (error) {
            // Token invalid/expired
            const loginUrl = new URL('/auth/login', req.url);
            // Clear the cookie just in case
            const response = NextResponse.redirect(loginUrl);
            response.cookies.delete('token');
            return response;
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/call/:path*'],
};
