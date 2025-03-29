"use client";

import React, { useEffect, useState } from "react";
import { getJobApplication } from "@/actions/jobApplicationActions";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { setJobApplicationsReducer } from "@/lib/slicer/jobApplicationsSlice";
import { LoadingSkeletonForDataTable } from "@/components/LoadingSkeleton";


const Page = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { applications, loading } = useSelector((state: RootState) => state.jobApplications);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    const fetchApplications = async () => {
      if (!user?.id || fetched) return;

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
      {!user?.id || loading ? <LoadingSkeletonForDataTable /> : <DataTable columns={columns} data={applications} />}
    </div>
  );
};

export default Page;
