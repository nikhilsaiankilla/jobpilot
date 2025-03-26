import { FeatureType } from "@/types/type";
import { ChartLine, Bell, FileText, BarChart3, Briefcase } from "lucide-react";

export const features: FeatureType[] = [
    {
        title: "Application Tracking",
        description: "Keep track of all your job applications in one place.",
        icon: ChartLine,
    },
    {
        title: "Follow-up Reminders",
        description: "Get notified when it's time to follow up.",
        icon: Bell,
    },
    {
        title: "Resume & Cover Letter AI",
        description: "Generate perfect resumes & cover letters tailored to job descriptions.",
        icon: FileText,
    },
    {
        title: "Analytics & Insights",
        description: "Get insights on your application success rate.",
        icon: BarChart3,
    },
    {
        title: "Job Search Integration",
        description: "Save and apply to jobs from external platforms.",
        icon: Briefcase,
    },
];

export const companies: { name: string, logo: string }[] = [
    {
        name: "Google",
        logo: "/googleLogo.png",
    },
    {
        name: "Microsoft",
        logo: "/googleLogo.png",
    },
    {
        name: "Amazon",
        logo: "/googleLogo.png",
    },
    {
        name: "Apple",
        logo: "/googleLogo.png",
    },
    {
        name: "Facebook",
        logo: "/googleLogo.png",
    },
    {
        name: "Netflix",
        logo: "/googleLogo.png",
    },
    {
        name: "Tesla",
        logo: "/googleLogo.png",
    },
    {
        name: "LinkedIn",
        logo: "/googleLogo.png",
    },
    {
        name: "Adobe",
        logo: "/googleLogo.png",
    },
    {
        name: "Spotify",
        logo: "/googleLogo.png",
    },
];
