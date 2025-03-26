"use server";

import { prisma } from "@/utils/prisma/prismaClient";
import { JobApplicationStatus, JobSource, JobType, CurrencyType } from "@prisma/client";

type AddJobApplicationResponse = {

}

type AddJobApplicationProps = {
    email: string;
    jobTitle: string;
    location?: string;
    companyName: string;
    status?: JobApplicationStatus;
    appliedDate?: Date;
    jobType?: JobType;
    salary?: number;
    currency?: CurrencyType;
    jobUrl?: string;
    jobId?: string;
    resumeId?: string;
    coverLetterId?: string;
    applicationSource?: JobSource;
    jobDescription?: string;
    noteId?: string
}

export const addJobApplication = async (data: AddJobApplicationProps) => {
    try {
        // Find user by email
        const user = await prisma.user.findFirst({ where: { email: data.email } });

        if (!user) {
            return { success: false, error: "User not found" };
        }

        // Find or create company
        let company = await prisma.company.findFirst({
            where: { name: data.companyName },
        });

        if (!company) {
            company = await prisma.company.create({
                data: { name: data.companyName },
            });
        }

        // Create job application
        const jobApplication = await prisma.jobApplication.create({
            data: {
                userId: user.id,
                jobTitle: data.jobTitle,
                location: data.location,
                companyId: company.id,
                status: data.status ?? JobApplicationStatus.NOT_YET_APPLIED,
                appliedDate: data.appliedDate ?? new Date(),
                jobType: data.jobType ?? JobType.FULL_TIME,
                salary: data.salary,
                currency: data.currency ?? CurrencyType.INR,
                jobUrl: data.jobUrl,
                jobId: data.jobId,
                resumeId: data.resumeId,
                coverLetterId: data.coverLetterId,
                applicationSource: data.applicationSource ?? JobSource.LINKEDIN,
                jobDescription: data.jobDescription,
                noteId: data.noteId,
            },
        });

        return { success: true, jobApplication };
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error adding job application:", error.message);
        }
        return { success: false, error: "Failed to add job application" };
    }
};

export const deleteJobApplication = () => {

}

export const updateJobApplication = () => {

}


