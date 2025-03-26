import { addCompany } from '@/actions/company';
import React, { useState } from 'react'
import { Label } from './ui/label';
import { Input } from './ui/input';
import { cn } from '@/lib/utils';
import { DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';

const AddCompanyForm = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [file, setFile] = useState<File | null>(null);

    const handleCompanySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const formData = new FormData();

            // Ensure inputs exist before accessing .value
            const form = e.currentTarget;

            formData.append("company-name", form["company-name"]?.value || "");
            formData.append("company-logo", file as Blob); // Ensure `file` is defined
            formData.append("company-location", form["company-location"]?.value || "");
            formData.append("company-size", form["company-size"]?.value || "");
            formData.append("company-website", form["company-website"]?.value || "");
            formData.append("company-industry", form["company-industry"]?.value || ""); // Fixed typo

            const response = await addCompany(formData);

            console.log(response);
        } catch (error) {
            console.error("Error submitting company form:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        if (event.dataTransfer.files?.[0]) {
            setFile(event.dataTransfer.files[0]);
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files?.[0]) {
            setFile(event.target.files[0]);
        }
    };

    return (
        <form onSubmit={handleCompanySubmit} className="w-full flex flex-col gap-6">
            {/* Company Name */}
            <div>
                <Label className="text-muted-foreground">Company Name</Label>
                <Input placeholder="Enter Company Name" className="w-full mt-2" type="text" name="company-name" aria-label="company-name" required />
            </div>

            {/* Company Logo Upload */}
            <div>
                <Label className="text-muted-foreground">Company Logo</Label>
                <div
                    className={cn(
                        "w-full mt-2 border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition",
                        "border-gray-300 hover:border-gray-500"
                    )}
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()} // Prevent default drag behavior
                    onClick={() => document.getElementById("fileInput")?.click()} // Trigger input on click
                >
                    <Input
                        id="fileInput"
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                        accept="image/*"
                        name="company-logo"
                    />
                    {file ? (
                        <p className="text-sm text-gray-700">{file.name}</p>
                    ) : (
                        <p className="text-sm text-gray-500">Drag & Drop or Click to Upload</p>
                    )}
                </div>
            </div>

            {/* Company Website */}
            <div>
                <Label className="text-muted-foreground">Company Website</Label>
                <Input placeholder="Enter Company Website" className="w-full mt-2" type="text" name="company-website" aria-label="company-site" />
            </div>

            {/* Industry */}
            <div>
                <Label className="text-muted-foreground">Industry</Label>
                <Input placeholder="Enter Industry" className="w-full mt-2" type="text" name="company-industry" aria-label="company-industry" />
            </div>

            {/* Company Size */}
            <div>
                <Label className="text-muted-foreground">Company Size</Label>
                <Input placeholder="Enter Company Size" className="w-full mt-2" type="text" name="company-size" aria-label="company-size" />
            </div>

            {/* Company Headquarters */}
            <div>
                <Label className="text-muted-foreground">Company Headquarters</Label>
                <Input placeholder="Enter Company Headquarters" className="w-full mt-2" type="text" name="company-location" aria-label="company-location" />
            </div>

            {/* Submit Button */}
            <DialogFooter>
                <Button type="submit" className="cursor-pointer">
                    {isLoading ? (
                        <>
                            <Loader2 size={14} className="animate-spin" /> Saving
                        </>
                    ) : (
                        "Save"
                    )}
                </Button>
            </DialogFooter>
        </form>

    )
}

export default AddCompanyForm