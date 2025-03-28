"use client";

import { deleteJobApplication } from "@/actions/jobApplicationActions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { removeJobApplicationReducer } from "@/lib/slicer/jobApplicationsSlice";
import { Applications } from "@/types/type";
import { IconArrowLeft, IconArrowRight, IconBriefcase, IconCheck, IconCircleCheckFilled, IconDotsVertical, IconLoader, IconX } from "@tabler/icons-react";
import { ColumnDef } from "@tanstack/react-table"
import { ArrowRightIcon, PenBox, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { JSX } from "react";
import { useDispatch } from "react-redux";

export const columns: ColumnDef<Applications>[] = [
    {
        accessorKey: "jobTitle",
        header: "Job Title",
    },
    {
        accessorKey: "company",
        header: "Company",
        cell: ({ row }) => (
            <div className="flex items-center space-x-1.5">
                {row.original.company.logoUrl ? (
                    <Image
                        src={row.original.company.logoUrl}
                        alt={row.original.company.logoUrl}
                        width={10}
                        height={10}
                        className="h-7 w-7 rounded-full"
                    />
                ) : (
                    <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                        N/A
                    </div>
                )}
                <span>{row.original.company.name || "N/A"}</span>
            </div>
        ),
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.original.status;

            if (!status) return "N/A";

            // Convert "NOT_YET_APPLIED" -> "Not Yet Applied"
            const formattedStatus = status
                .toLowerCase()
                .split("_")
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");

            // Define icon & color mapping
            const statusConfig = {
                "Not Yet Applied": { icon: <IconLoader className="text-gray-500" />, color: "border-gray-400 text-gray-500" },
                "Applied": { icon: <IconCircleCheckFilled className="fill-green-500 dark:fill-green-400" />, color: "border-green-500 text-green-500" },
                "Progress": { icon: <IconArrowRight className="text-yellow-500" />, color: "border-yellow-500 text-yellow-500" }, // Updated to Yellow
                "Rejected": { icon: <IconX className="text-red-500" />, color: "border-red-500 text-red-500" },
                "Offer Received": { icon: <IconBriefcase className="text-yellow-500" />, color: "border-yellow-500 text-yellow-500" },
                "Offer Accepted": { icon: <IconCheck className="text-green-700" />, color: "border-green-700 text-green-700" },
                "Withdrawn": { icon: <IconArrowLeft className="text-gray-600" />, color: "border-gray-600 text-gray-600" },
            };

            const { icon, color } = (statusConfig as Record<string, { icon: JSX.Element; color: string }>)[formattedStatus] || { icon: <IconLoader />, color: "border-gray-400 text-gray-500" };

            return (
                <Badge variant="outline" className={`px-1.5 flex items-center space-x-1 ${color}`}>
                    {icon}
                    <span>{formattedStatus}</span>
                </Badge>
            );
        }
    }
    ,
    {
        accessorKey: "appliedDate",
        header: "Applied Date",
        cell: ({ row }) => row.original.appliedDate
            ? new Date(row.original.appliedDate).toLocaleDateString()
            : "N/A",
    },
    {
        accessorKey: "jobType",
        header: "Job Type",
        cell: ({ row }) => {
            const jobType = row.original.jobType;

            if (!jobType) return "N/A";

            const formattedStatus = jobType
                .toLowerCase()
                .split("_")
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");

            return formattedStatus;
        }
    },
    {
        accessorKey: "salary",
        header: "Salary",
        cell: ({ row }) => {
            const { salary, currency } = row.original;

            if (!salary) return "N/A";

            // Function to format salary based on currency
            const formatSalary = (num: number, currency: string) => {
                switch (currency) {
                    case "INR": // Indian Rupee
                        if (num >= 10000000) return (num / 10000000).toFixed(1) + " Cr";
                        if (num >= 100000) return (num / 100000).toFixed(1) + " L";
                        return num.toLocaleString();

                    case "USD":
                    case "EUR":
                    case "GBP":
                        if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
                        if (num >= 1000) return (num / 1000).toFixed(1) + "K";
                        return num.toLocaleString();

                    default:
                        return num.toLocaleString(); // Fallback for other currencies
                }
            };

            return `${currency} ${formatSalary(salary, currency)}`;
        }
    },
    {
        accessorKey: "jobUrl",
        header: "Job URL",
        cell: ({ row }) => row.original.jobUrl
            ? <Link href={row.original.jobUrl} target="_blank" className="text-blue-500 underline">View Job Post</Link>
            : "N/A",
    },
    {
        accessorKey: "applicationSource",
        header: "Application Source",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const dispatch = useDispatch(); // Moved inside to avoid invalid hook call

            const handleDeleteApplication = async (id: string) => {
                const res = await deleteJobApplication(id);
                if (res?.success) {
                    dispatch(removeJobApplicationReducer(id));
                    console.log("Deleted successfully");
                } else {
                    console.log("Something went wrong");
                }
            };

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
                            size="icon"
                        >
                            <IconDotsVertical />
                            <span className="sr-only">Open menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-32">
                        <DropdownMenuItem className="cursor-pointer">
                            <ArrowRightIcon size={22} />
                            Open
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                            <PenBox size={22} />
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            variant="destructive"
                            className="cursor-pointer"
                            onClick={() => handleDeleteApplication(row.original.id)}
                        >
                            <Trash2 size={22} className="text-red-600" />
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    }
];


