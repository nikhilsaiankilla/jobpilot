"use client";

import { Bookmark, ExternalLink } from "lucide-react";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface JobPostingProps {
  jobId: string;
  jobTitle: string;
  companyName: string;
  postedOn: string;
  postedBy?: string;
  jobUrl: string;
}

export default function JobPostingCard({
  jobId,
  jobTitle,
  companyName,
  postedOn,
  postedBy,
  jobUrl,
}: JobPostingProps) {
  const [saved, setSaved] = useState(false);

  const handleSaveJob = () => {
    setSaved(!saved);
    // TODO: Add logic to save job to database
    console.log(saved ? "Removed from saved" : "Saved job:", jobId);
  };

  return (
    <Card className="p-2 shadow-sm rounded-md bg-secondary text-foreground transition hover:shadow-md">
      <CardContent className="flex flex-col gap-2">
        {/* Job Title & Company */}
        <h3 className="text-lg font-semibold">{jobTitle}</h3>
        <p className="text-sm text-gray-400">{companyName}</p>

        {/* Job Info */}
        <div className="flex flex-col justify-between text-xs text-gray-500">
          <p>Posted on: {postedOn}</p>
          {postedBy && <p>By: {postedBy}</p>}
        </div>

        <p className="text-xs text-gray-400">Job ID: {jobId}</p>

        <div className="w-full flex justify-between gap-2">
          <Button variant="outline" className="w-4/5" onClick={() => window.open(jobUrl, "_blank")}>
            Apply Now
            <ExternalLink size={18} />
          </Button>

          {/* Save Button */}
          <Button
            size="icon"
            variant="outline"
            className={`rounded-full ${saved ? "bg-primary text-white" : ""}`}
            onClick={handleSaveJob}
          >
            <Bookmark size={18} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
