"use server";

import { prisma } from "@/utils/prisma/prismaClient";

export const addCompany = async (formData: FormData) => {
    try {
        const name = formData.get("company-name") as string;
        const address = formData.get("company-location") as string;
        const websiteUrl = formData.get("company-website") as string;
        const size = formData.get("company-size") as string;
        const industry = formData.get("company-industry") as string;
        const image = formData.get("company-logo") as File;

        // TODO : STORE IMAGE IN CLOUD (CLOUDINARY ETC)

        if (!name) {
            return { message: "all fields are required", success: false, status: 400 }
        }

        const company = await prisma.company.create({
            data: {
                name,
                website: websiteUrl,
                logoUrl: "https://i.pinimg.com/736x/b3/8a/a1/b38aa1b21050b0e769a97eb751d12829.jpg",
                industry,
                size,
                location: address,
            },
        });

        return { message: "Company added successfully", success: true, status: 201, company };
    } catch (error) {
        console.error(error);
        return { message: "Internal Server Error", status: 500, success: false };
    }
};
