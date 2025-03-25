"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface UploadDocumentCardProps {
  type: "resume" | "cover_letter"; // Allows uploading either a Resume or Cover Letter
}

export default function UploadDocumentCard({ type }: UploadDocumentCardProps) {
  const [open, setOpen] = useState(false);
  const [documentTitle, setDocumentTitle] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Dynamic labels based on type
  const isResume = type === "resume";
  const title = isResume ? "Upload Resume" : "Upload Cover Letter";
  const buttonText = isResume ? "Add Resume" : "Add Cover Letter";
  const placeholderText = isResume ? "Enter resume title..." : "Enter cover letter title...";
  const acceptedFormats = ".pdf,.doc,.docx";

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (!selectedFile || !documentTitle.trim()) {
      alert("Please enter a title and select a file.");
      return;
    }
    // Handle file upload logic here
    console.log("Uploading:", { type, documentTitle, selectedFile });

    // Close dialog and reset state
    setOpen(false);
    setDocumentTitle("");
    setSelectedFile(null);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Add Document Card (Triggers Dialog) */}
      <DialogTrigger asChild>
        <div
          className="relative w-full aspect-w-2 aspect-h-3 p-4 shadow-sm rounded-md bg-secondary text-foreground flex flex-col items-center justify-center cursor-pointer hover:bg-secondary/80 transition"
          onClick={() => setOpen(true)}
        >
          <button className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white">
            <Plus size={24} />
          </button>
          <div className="mt-2 text-sm text-gray-400">{buttonText}</div>
        </div>
      </DialogTrigger>

      {/* ShadCN Dialog */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        {/* File Upload Input (Always Visible) */}
        <div>
          <label className="text-sm font-medium">{title}</label>
          <Input type="file" accept={acceptedFormats} onChange={handleFileChange} className="mt-2" />
        </div>

        {/* Document Title Input (Only Shown After File is Selected) */}
        {selectedFile && (
          <div className="mt-4">
            <label className="text-sm font-medium">Document Title</label>
            <Input
              type="text"
              placeholder={placeholderText}
              value={documentTitle}
              onChange={(e) => setDocumentTitle(e.target.value)}
              className="mt-2"
            />
          </div>
        )}

        {/* Upload Button */}
        <Button className="w-full mt-4" onClick={handleSubmit} disabled={!selectedFile || !documentTitle.trim()}>
          Upload
        </Button>
      </DialogContent>
    </Dialog>
  );
}
