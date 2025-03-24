import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

// Secret Key for JWT Verification (Get it from Supabase or your auth provider)
const JWT_SECRET = new TextEncoder().encode(process.env.NEXT_PUBLIC_SUPABASE_JWT_SECRET!);

export async function middleware(request: NextRequest) {
    const token = request.cookies.get("accessToken")?.value;
    const resetToken = request.cookies.get("resetToken")?.value;
    const otpVerified = request.cookies.get("otpVerified")?.value;
    const { pathname } = request.nextUrl;

    // Define protected routes
    const protectedRoutes = ["/dashboard", "/profile", "/settings"];
    const authRoutes = ["/auth/login", "/auth/signup"];
    const resetProtectedRoutes = ["/auth/verify-otp", "/auth/reset-password"];

    // Protect authenticated routes
    if (protectedRoutes.some((route) => pathname.startsWith(route))) {
        if (!token) return NextResponse.redirect(new URL("/unauthorized", request.url));

        try {
            await jwtVerify(token, JWT_SECRET);
        } catch (error) {
            console.error("Invalid Token:", error);
            return NextResponse.redirect(new URL("/unauthorized", request.url));
        }
    }

    // Protect OTP verification & password reset routes
    if (resetProtectedRoutes.includes(pathname)) {
        if (!resetToken) {
            return NextResponse.redirect(new URL("/auth/forgot-password", request.url));
        }
        if (pathname === "/auth/reset-password" && !otpVerified) {
            return NextResponse.redirect(new URL("/auth/verify-otp", request.url));
        }
    }

    // Prevent authenticated users from accessing login or signup
    if (authRoutes.includes(pathname) && token) {
        try {
            const { payload } = await jwtVerify(token, JWT_SECRET);
            if (payload?.sub) {
                return NextResponse.redirect(new URL("/dashboard", request.url));
            }
        } catch (error) {
            console.error("Invalid Token:", error);
            return NextResponse.redirect(new URL("/auth/login", request.url));
        }
    }

    return NextResponse.next(); // Allow request to proceed
}

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/profile/:path*",
        "/settings/:path*",
        "/auth/login",
        "/auth/signup",
        "/auth/verify-otp",
        "/auth/reset-password",
    ],
};
