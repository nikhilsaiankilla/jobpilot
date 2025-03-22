import { prisma } from "./prisma/prismaClient";

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
