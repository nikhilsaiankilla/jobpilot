import { prisma } from "@/utils/prisma/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        // Extract query parameters
        const url = new URL(req.url);
        const page = parseInt(url.searchParams.get("page") || "1", 10);
        const pageSize = parseInt(url.searchParams.get("pageSize") || "5", 10);
        const userId = url.searchParams.get("userId");

        if (!userId) {
            return NextResponse.json(
                { success: false, error: "User id required" },
                { status: 400 }
            );
        }

        if (page < 1 || pageSize < 1) {
            return NextResponse.json(
                { success: false, error: "Invalid pagination parameters" },
                { status: 400 }
            );
        }

        const skip = (page - 1) * pageSize;

        // Fetch notes with pagination
        const notes = await prisma.note.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" },
            skip,
            take: pageSize,
        });

        const totalNotes = await prisma.note.count();
        const totalPages = Math.ceil(totalNotes / pageSize);

        return NextResponse.json({ success: true, notes, totalPages });
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error fetching notes:", error);
            return NextResponse.json(
                { success: false, error: error.message || "Failed to fetch notes" },
                { status: 500 }
            );
        }
        return NextResponse.json(
            { success: false, error: "Failed to fetch notes" },
            { status: 500 }
        );
    }
}
