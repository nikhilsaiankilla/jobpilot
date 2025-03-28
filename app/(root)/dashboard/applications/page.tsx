"use client";

import React, { useEffect, useState } from "react";
import { getJobApplication } from "@/actions/jobApplicationActions";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Skeleton } from "@/components/ui/skeleton";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { setJobApplicationsReducer } from "@/lib/slicer/jobApplicationsSlice";

const LoadingSkeleton = () => (
  <div className="w-full px-3 sm:px-5 md:px-10 py-5">
    <div className="mb-4">
      <Skeleton className="h-10 w-48 rounded-md" />
    </div>
    <div className="space-y-3">
      {[...Array(5)].map((_, index) => (
        <div key={index} className="w-full flex items-center space-x-2">
          <div className="w-full grid grid-cols-8 gap-5">
            <Skeleton className="h-10 w-full rounded-md" />
            <Skeleton className="h-10 w-full rounded-md" />
            <Skeleton className="h-10 w-full rounded-md" />
            <Skeleton className="h-10 w-full rounded-md" />
            <Skeleton className="h-10 w-full rounded-md" />
            <Skeleton className="h-10 w-full rounded-md" />
            <Skeleton className="h-10 w-full rounded-md" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const Page = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { applications, loading } = useSelector((state: RootState) => state.jobApplications);
  const [fetched, setFetched] = useState(false); // Track if data has been fetched

  useEffect(() => {
    const fetchApplications = async () => {
      if (!user?.id || fetched) return; // Prevent fetching if id is missing or already fetched

      try {
        const applicationsData = await getJobApplication(user.id);

        const transformedData = applicationsData?.applications?.map((app) => ({
          id: app.id,
          jobTitle: app.jobTitle,
          status: app.status,
          appliedDate: app.appliedDate ?? undefined,
          jobType: app.jobType,
          salary: app.salary ?? undefined,
          currency: app.currency,
          jobUrl: app.jobUrl ?? undefined,
          applicationSource: app.applicationSource,
          company: {
            id: app.company.id,
            name: app.company.name,
            logoUrl: app.company.logoUrl ?? undefined,
          },
        })) ?? [];

        dispatch(setJobApplicationsReducer(transformedData));
        setFetched(true); // Mark as fetched
      } catch (error) {
        console.error("Error fetching job applications:", error);
      }
    };

    fetchApplications();
  }, [dispatch, user?.id, fetched]); // Run effect when user.id changes

  return (
    <div className="w-full px-3 sm:px-5 md:px-10 py-5">
      {!user?.id || loading ? <LoadingSkeleton /> : <DataTable columns={columns} data={applications} />}
    </div>
  );
};

export default Page;
