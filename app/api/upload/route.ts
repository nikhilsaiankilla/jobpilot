import cloudinary from "@/lib/cloudinary";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;
        const type = formData.get("type") as string;
        const customName = formData.get("customName") as string | null;

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        // 🔹 Convert file to Base64
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const base64File = `data:${file.type};base64,${buffer.toString("base64")}`;

        // 🔹 Define folder
        let folder = "misc";
        switch (type) {
            case "user":
                folder = "users/profile-pictures";
                break;
            case "company":
                folder = "companies/logos";
                break;
            case "resume":
                folder = "documents/resumes";
                break;
            case "cover_letter":
                folder = "documents/cover-letters";
                break;
        }

        // 🔹 Define a custom filename (if provided) or use default
        const fileName = customName
            ? `${customName}-${Date.now()}`
            : `file-${Date.now()}`;

        // 🔹 Upload with custom filename
        const uploadResponse = await cloudinary.uploader.upload(base64File, {
            folder: folder,
            public_id: fileName, // Custom name
            resource_type: "auto",
            overwrite: true, // Optional: Replace existing files with the same name
        });

        return NextResponse.json({ url: uploadResponse.secure_url });
    } catch (error) {
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
}
