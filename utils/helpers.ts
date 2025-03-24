import { prisma } from "./prisma/prismaClient";
import bcrypt from "bcryptjs";

// referral code generator 
export const generateUniqueReferralCode = async (name: string): Promise<string> => {
    let isUnique = false;
    let referralCode = "";

    while (!isUnique) {
        const cleanedName = name.trim().split(" ")[0].toUpperCase(); // Get first name in uppercase
        const uniqueNumber = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit number
        referralCode = `${cleanedName}${uniqueNumber}`;

        // Check in DB if this referral code already exists
        const existingUser = await prisma.user.findUnique({
            where: { referralCode },
            select: { id: true },
        });

        if (!existingUser) {
            isUnique = true; // Code is unique, break loop
        }
    }

    return referralCode;
};

// Utility to generate OTP
export const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Utility to hash OTP
export const hashOTP = async (otp: string) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(otp, salt);
};

// Utility to verify OTP
export const verifyOTP = async (otp: string, hash: string) => {
    return await bcrypt.compare(otp, hash);
};

