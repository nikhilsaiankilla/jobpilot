"use server";

import { generateOTP, hashOTP, verifyOTP } from "@/utils/helpers";
import { prisma } from "@/utils/prisma/prismaClient";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export const sendOTP = async (email: string) => {
    const cookieStore = await cookies()
    // Check if user exists
    const user = await prisma.user.findUnique({ where: { email }, select: { email: true } });
    if (!user) return { success: false, message: "User not found" };

    const existingUser = await prisma.user.findUnique({
        where: { email },
        select: { provider: true },
    });

    if (!existingUser) {
        return { success: false, message: "User not found" };
    }

    if (existingUser.provider !== "email") {
        return {
            success: false,
            message: `Your account is connected with ${existingUser.provider}. Use ${existingUser.provider} to log in.`
        };
    }

    // Generate OTP
    const otp = generateOTP();
    const hashedOtp = await hashOTP(otp);

    const existingOtp = await prisma.passwordReset.findFirst({ where: { email }, select: { id: true } });

    if (existingOtp) {
        await prisma.passwordReset.delete({ where: { id: existingOtp?.id } });
    }

    // Store OTP in DB with expiry
    await prisma.passwordReset.create({
        data: {
            email,
            otp: hashedOtp,
            expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 min expiry
        },
    });

    // Send OTP via email (replace with actual email logic)
    console.log(`OTP for ${email}: ${otp}`);

    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict" as "strict",
        path: "/",
        maxAge: 10 * 60,
    };

    // Store a session flag to allow reset
    cookieStore.set("resetToken", email, cookieOptions);

    return { success: true, message: "OTP sent to your email" };
};

export const verifyOTPAction = async (email: string, otp: string) => {
    const cookieStore = await cookies()

    // Get OTP from DB
    const storedOtp = await prisma.passwordReset.findFirst({
        where: { email },
    });

    if (!storedOtp) return { success: false, message: "OTP not found or expired" };

    // Check OTP expiration
    if (new Date() > new Date(storedOtp.expiresAt)) {
        await prisma.passwordReset.delete({ where: { email } });
        return { success: false, message: "OTP expired" };
    }

    // Verify OTP
    const isValid = await verifyOTP(otp, storedOtp.otp);
    if (!isValid) return { success: false, message: "Invalid OTP" };

    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict" as "strict",
        path: "/",
        maxAge: 10 * 60,
    };

    const otpVerified = "verified";

    // Store a session flag to allow reset
    cookieStore.set("otpVerified", otpVerified, cookieOptions);

    return { success: true, message: "OTP verified. You can reset your password now." };
};

export const resetPassword = async (newPassword: string) => {

    const supabase = createClient();
    const cookieStore = await cookies();

    // Check if resetToken exists
    const email = cookieStore.get("resetToken")?.value;
    if (!email) return { success: false, message: "Unauthorized reset attempt" };

    // Find user in database
    const existingUser = await prisma.user.findUnique({
        where: { email },
        select: { authId: true, provider: true },
    });

    
    if (!existingUser) {
        return { success: false, message: "User not found" };
    }

    console.log(existingUser);

    if (existingUser.provider !== "email") {
        return {
            success: false,
            message: `Your account is connected with ${existingUser.provider}. Use ${existingUser.provider} to log in.`
        };
    }

    // Update password using Supabase Admin API
    const { error } = await (await supabase).auth.admin.updateUserById(existingUser.authId, { password: newPassword });

    if (error) return { success: false, message: error.message || "Failed to reset password" };

    // Remove reset token & delete OTP record
    cookieStore.delete("resetToken");
    cookieStore.delete("otpVerified");
    await prisma.passwordReset.delete({ where: { email } });

    return { success: true, message: "Password reset successfully" };
};
