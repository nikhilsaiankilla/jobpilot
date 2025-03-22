import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

// Secret Key for JWT Verification (Get it from Supabase or your auth provider)
const JWT_SECRET = new TextEncoder().encode(process.env.NEXT_PUBLIC_SUPABASE_JWT_SECRET!);

export async function middleware(request: NextRequest) {
    const token = request.cookies.get('accessToken')?.value;
    const { pathname } = request.nextUrl;

    // Define protected routes
    const protectedRoutes = ['/dashboard', '/profile', '/settings'];
    const authRoutes = ['/auth/login', '/auth/signup']; 

    if (protectedRoutes.some(route => pathname.startsWith(route))) {
        if (!token) {
            return NextResponse.redirect(new URL('/unauthorized', request.url));
        }

        try {
            // Verify the token using 'jose'
            const { payload } = await jwtVerify(token, JWT_SECRET);
            if (!payload || !payload.sub) {
                return NextResponse.redirect(new URL('/unauthorized', request.url));
            }
        } catch (error) {
            console.error('Invalid Token:', error);
            return NextResponse.redirect(new URL('/unauthorized', request.url));
        }
    }

    // Prevent authenticated users from accessing the login or register page
    if (authRoutes.includes(pathname) && token) {
        try {
            const { payload } = await jwtVerify(token, JWT_SECRET);
            if (payload && payload.sub) {
                return NextResponse.redirect(new URL('/dashboard', request.url));
            }
        } catch (error) {
            console.error('Invalid Token:', error);
            return NextResponse.redirect(new URL('/auth/login', request.url));
        }
    }

    return NextResponse.next(); // Allow the request to continue
}

export const config = {
    matcher: ['/dashboard/:path*', '/profile/:path*', '/settings/:path*', '/auth/login', '/auth/signup'],
};
