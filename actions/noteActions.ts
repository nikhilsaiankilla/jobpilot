"use server";

import { prisma } from "@/utils/prisma/prismaClient";

export const addNotesToDb = async (content: string, color: string = "#FFFF00", userId: string) => {
    try {
        if (!content.trim()) {
            return { success: false, message: "Notes shouldn't be empty", status: 400 };
        }

        await prisma.note.create({
            data: { userId, content, color }
        });

        return { success: true, message: "Uploaded successfully", status: 200 };
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error adding job application:", error.message);
            return { success: false, error: error.message || "Failed to add job application" };
        }
        return { success: false, error: "Failed to add job application" };
    }
}
