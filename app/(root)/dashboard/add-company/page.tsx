"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import React, { useState } from 'react'

const page = () => {
    const [file, setFile] = useState<File | null>(null);

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
        <div className='w-full flex items-center flex-col bg-background min-h-screen p-6'>
            <Card className='w-full max-w-4xl mt-5 rounded-lg bg-secondary shadow-lg border border-border'>
                <CardHeader className='text-center'>
                    <CardTitle className='text-2xl font-semibold text-foreground'>Add Companies</CardTitle>
                    <CardDescription className='text-muted-foreground'>Please Contribute to our DB to help other user to find the companies</CardDescription>
                </CardHeader>
                <CardContent>
                    <form action="#" className='w-full flex flex-col gap-6'>
                        <div>
                            <Label className='text-muted-foreground'>Company Name</Label>
                            <Input placeholder='Enter Job Title' className='w-full mt-2' type='text' name='company-name' aria-label='company-name' />
                        </div>
                        <div>
                            <Label className='text-muted-foreground'>Company Logo</Label>
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
                                    accept=".png,.jpg,.webp,.avif"
                                    name='resume'
                                />
                                {file ? (
                                    <p className="text-sm text-gray-700">{file.name}</p>
                                ) : (
                                    <p className="text-sm text-gray-500">Drag & Drop or Click to Upload</p>
                                )}
                            </div>
                        </div>
                        <div>
                            <Label className='text-muted-foreground'>Company Website</Label>
                            <Input placeholder='Enter Job Title' className='w-full mt-2' type='text' name='company-website' aria-label='company-site' />
                        </div>
                        <div>
                            <Label className='text-muted-foreground'>Industry</Label>
                            <Input placeholder='Enter Job Title' className='w-full mt-2' type='text' name='company-induxtry' aria-label='company-industry' />
                        </div>
                        <div>
                            <Label className='text-muted-foreground'>Company size</Label>
                            <Input placeholder='Enter Job Title' className='w-full mt-2' type='text' name='company-sizr' aria-label='company-size' />
                        </div>
                        <div>
                            <Label className='text-muted-foreground'>Company HeadQuators</Label>
                            <Input placeholder='Enter Job Title' className='w-full mt-2' type='text' name='company-location' aria-label='company-location' />
                        </div>

                        <div className='flex justify-end gap-4'>
                            <Button variant={'outline'} className='text-muted-foreground'>Cancel</Button>
                            <Button className='bg-primary text-white'>Submit</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default page