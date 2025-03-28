"use server";

import { prisma } from "@/utils/prisma/prismaClient";
import { JobApplicationStatus, JobSource, JobType, CurrencyType } from "@prisma/client";

export const addJobApplication = async (prevState: any, formData: FormData) => {
    try {
        const userId = formData.get("userId") as string;
        const jobTitle = formData.get("jobTitle") as string;
        const location = formData.get("location") as string | undefined;
        const companyId = formData.get("companyId") as string;
        const status = formData.get("status") as JobApplicationStatus ?? JobApplicationStatus.NOT_YET_APPLIED;
        const appliedDate = formData.get("appliedDate") ? new Date(formData.get("appliedDate") as string) : new Date();
        const jobType = formData.get("jobType") as JobType ?? JobType.FULL_TIME;
        const salary = formData.get("salary") ? Number(formData.get("salary")) : undefined;
        const currency = formData.get("currency") as CurrencyType ?? CurrencyType.INR;
        const jobUrl = formData.get("jobUrl") as string | undefined;
        const jobId = formData.get("jobId") as string | undefined;
        const resumeId = formData.get("resumeId") as string | undefined;
        const coverLetterId = formData.get("coverLetterId") as string | undefined;
        const applicationSource = formData.get("applicationSource") as JobSource ?? JobSource.LINKEDIN;
        const jobDescription = formData.get("jobDescription") as string | undefined;
        const noteId = formData.get("noteId") as string | undefined;


        // Create job application
        const jobApplication = await prisma.jobApplication.create({
            data: {
                userId,
                jobTitle,
                location,
                companyId: companyId,
                status,
                appliedDate,
                jobType,
                salary,
                currency,
                jobUrl,
                jobId,
                // TODO : ADD THE ACTUAL RESUME AND COVER LETTER ID HERE
                // resumeId : "dummy",
                // coverLetterId,
                applicationSource,
                jobDescription,
                noteId,
            },
            include: {
                company: {
                    select: {
                        id: true,
                        name: true,
                        logoUrl: true,
                    }
                }
            }
        });

        return { success: true, status: 200, message: "created successfully", jobApplication };
    } catch (error) {
        console.error("Error adding job application:", error);
        return { success: false, error: "Failed to add job application" };
    }
};

export const getJobApplication = async (userId: string) => {
    try {
        if (!userId) {
            return { success: false, message: "User id required", status: 404 };
        }

        const applications = await prisma.jobApplication.findMany({
            where: { userId },
            select: {
                id: true,
                jobTitle: true,
                company: {
                    select: {
                        id: true,
                        name: true,
                        logoUrl: true,
                    },
                },
                status: true,
                appliedDate: true,
                jobType: true,
                salary: true,
                currency: true,
                jobUrl: true,
                applicationSource: true,
            },
        });

        return { success: true, message: "Applications fetched successfully", status: 200, applications };
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log(error);
            return { success: false, error: error.message || "Failed to add job application", status: 500 };
        } else {
            console.log(error);

            return { success: false, error: "Failed to add job application", status: 500 };
        }
    }
}

export const deleteJobApplication = async (applicationId: string) => {
    try {
        if (!applicationId) {
            throw new Error("Application ID and User ID are required.");
        }

        console.log(applicationId);


        // Verify the application belongs to the user
        const application = await prisma.jobApplication.findUnique({
            where: { id: applicationId },
        });

        if (!application) {
            return { success: false, message: "Job application not found or unauthorized." };
        }

        // Delete resume & cover letter files from Supabase Storage
        if (application.resumeId) {
            await prisma.resume.deleteMany({ where: { jobApplicationId: applicationId } });
        }

        if (application.coverLetterId) {
            await prisma.coverLetter.deleteMany({ where: { jobApplicationId: applicationId } });
        }

        // Delete job application
        await prisma.jobApplication.delete({ where: { id: applicationId } });

        return { success: true, message: "Job application deleted successfully." };
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log(error);
            return { success: false, error: error.message || "Failed to add job application", status: 500 };
        } else {
            console.log(error);

            return { success: false, error: "Failed to add job application", status: 500 };
        }
    }
};

// export const updateJobApplication = () => {

// }

