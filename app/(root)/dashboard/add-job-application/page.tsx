"use client"

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { CalendarIcon } from 'lucide-react'
import React, { useActionState, useState } from 'react'
import { format } from "date-fns"
import { cn } from '@/lib/utils'

const colors = {
  yellow: "bg-yellow-100",
  blue: "bg-blue-100",
  pink: "bg-pink-100",
  green: "bg-green-100",
  purple: "bg-purple-100",
};

const page = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [file, setFile] = useState<File | null>(null);
  const [selectedColor, setSelectedColor] = useState<keyof typeof colors>("yellow");


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files?.[0]) {
      setFile(event.dataTransfer.files[0]);
    }
  };


  return (
    <div className='w-full flex items-center flex-col bg-background min-h-screen p-6'>
      <Card className='w-full max-w-4xl mt-5 rounded-lg bg-secondary shadow-lg border border-border'>
        <CardHeader className='text-center'>
          <CardTitle className='text-2xl font-semibold text-foreground'>Add Job Application</CardTitle>
          <CardDescription className='text-muted-foreground'>Track your job applications easily</CardDescription>
        </CardHeader>
        <CardContent>
          <form action="#" className='w-full flex flex-col gap-6'>
            <div>
              <Label className='text-muted-foreground'>Job Title</Label>
              <Input placeholder='Enter Job Title' className='w-full mt-2' type='text' name='title' aria-label='job-application-title' />
            </div>

            <div>
              <Label className='text-muted-foreground'>Company Name</Label>
              <Input placeholder='Enter Company Name' className='w-full mt-2' type='text' name='company' aria-label='company-name' />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              <div>
                <Label className='text-muted-foreground'>Location</Label>
                <Input placeholder='Enter Location' className='w-full mt-2' type='text' name='location' aria-label='job-location' />
              </div>

              <div>
                <Label className='text-muted-foreground'>Status</Label>
                <Select name='job-status' aria-label="job-status">
                  <SelectTrigger className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive mt-2">
                    <SelectValue placeholder="Job Status"/>
                  </SelectTrigger>
                  <SelectContent className='w-full bg-secondary border border-border rounded-lg shadow-lg' position="popper">
                    <SelectGroup className='px-3 py-2'>
                      <SelectLabel>Status</SelectLabel>
                      <SelectItem value="apple" className='hover:bg-secondary transition-all duration-150 ease-in'>Not Yet Applied</SelectItem>
                      <SelectItem value="banana" className='hover:bg-secondary transition-all duration-150 ease-in'>Applied</SelectItem>
                      <SelectItem value="blueberry" className='hover:bg-secondary transition-all duration-150 ease-in'>Progress</SelectItem>
                      <SelectItem value="grapes" className='hover:bg-secondary transition-all duration-150 ease-in'>Withdrawn</SelectItem>
                      <SelectItem value="pineapple" className='hover:bg-secondary transition-all duration-150 ease-in'>Rejected</SelectItem>
                      <SelectItem value="pineapple" className='hover:bg-secondary transition-all duration-150 ease-in'>Offer Received</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className='text-muted-foreground mb-2'>Applied Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={`w-[240px] pl-3 text-left font-normal ${!selectedDate ? "text-muted-foreground" : ""}`}
                    >
                      {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
                <Label className='text-muted-foreground'>Job Type</Label>
                <Select name='job-type' aria-label="job-type" >
                  <SelectTrigger className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive mt-2">
                    <SelectValue placeholder="Job Status" />
                  </SelectTrigger>
                  <SelectContent className='w-full bg-secondary border border-border rounded-lg shadow-lg' position="popper">
                    <SelectGroup className='px-3 py-2'>
                      <SelectLabel>Job Type</SelectLabel>
                      <SelectItem value="apple" className='hover:bg-secondary transition-all duration-150 ease-in'>Full Time</SelectItem>
                      <SelectItem value="banana" className='hover:bg-secondary transition-all duration-150 ease-in'>Part Time</SelectItem>
                      <SelectItem value="blueberry" className='hover:bg-secondary transition-all duration-150 ease-in'>Internship</SelectItem>
                      <SelectItem value="grapes" className='hover:bg-secondary transition-all duration-150 ease-in'>Appercationship</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className='text-muted-foreground'>Expected Salary</Label>
                <div className='flex gap-2 items-center'>
                  <Input placeholder='Amount' className='w-3/5 mt-2' type='number' name='salary' aria-label='job-salary' />

                  <Select name='currency' aria-label="currency">
                    <SelectTrigger className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-2/5 min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive mt-2">
                      <SelectValue placeholder="INR" />
                    </SelectTrigger>
                    <SelectContent className='w-full bg-secondary border border-border rounded-lg shadow-lg' position="popper">
                      <SelectGroup className='px-3 py-2'>
                        <SelectLabel>Status</SelectLabel>
                        <SelectItem value="apple" className='hover:bg-secondary transition-all duration-150 ease-in'>INR</SelectItem>
                        <SelectItem value="banana" className='hover:bg-secondary transition-all duration-150 ease-in'>USD</SelectItem>
                        <SelectItem value="blueberry" className='hover:bg-secondary transition-all duration-150 ease-in'>EUR</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
                <Label className='text-muted-foreground'>Job Source</Label>
                <Select name='job-source' aria-label="job-source">
                  <SelectTrigger className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive mt-2">
                    <SelectValue placeholder="Job Status" />
                  </SelectTrigger>
                  <SelectContent className='w-full bg-secondary border border-border rounded-lg shadow-lg' position="popper">
                    <SelectGroup className='px-3 py-2'>
                      <SelectLabel>Job Source</SelectLabel>
                      <SelectItem value="apple" className='hover:bg-secondary transition-all duration-150 ease-in'>Linkedin</SelectItem>
                      <SelectItem value="banana" className='hover:bg-secondary transition-all duration-150 ease-in'>Glassdoor</SelectItem>
                      <SelectItem value="blueberry" className='hover:bg-secondary transition-all duration-150 ease-in'>Naukari</SelectItem>
                      <SelectItem value="grapes" className='hover:bg-secondary transition-all duration-150 ease-in'>Withdrawn</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className='text-muted-foreground'>Job ID</Label>
                <Input placeholder='Enter Job ID' className='w-full mt-2' type='text' name='job-id' aria-label='job-id' />
              </div>
            </div>

            <div>
              <Label className='text-muted-foreground'>Job Posting URL</Label>
              <Input placeholder='Enter Job Post URL' className='w-full mt-2' type='text' name='job-url' aria-label='job-url' />
            </div>

            <div>
              <Label className='text-muted-foreground'>Job Description</Label>
              <Textarea placeholder='Enter Job Description' className='w-full h-32 mt-2' name='job-description' aria-label='job-description' />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
                <Label className='text-muted-foreground'>Resume</Label>
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
                    accept=".pdf,.doc,.docx"
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
                <Label className="text-muted-foreground">Cover letter</Label>
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
                    name='cover-letter'
                    id="fileInput"
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                  />
                  {file ? (
                    <p className="text-sm text-gray-700">{file.name}</p>
                  ) : (
                    <p className="text-sm text-gray-500">Drag & Drop or Click to Upload</p>
                  )}
                </div>
              </div>
            </div>


            <div className="flex flex-col items-start">
              <Label className="text-muted-foreground">Notes</Label>

              {/* Color Picker */}
              <div className="flex gap-2 mt-2">
                {Object.keys(colors).map((color) => (
                  <button
                    key={color}
                    className={cn(
                      "w-6 h-6 rounded-full border-2 cursor-pointer transition",
                      colors[color as keyof typeof colors],
                      selectedColor === color ? "border-black" : "border-transparent"
                    )}
                    onClick={() => setSelectedColor(color as keyof typeof colors)}
                  />
                ))}
              </div>

              {/* Sticky Note */}
              <div
                className={cn(
                  "w-full mt-2 p-4 rounded-lg shadow-lg transition-shadow duration-300 ease-in-out hover:shadow-xl",
                  colors[selectedColor],
                  "text-gray-900"
                )}
              >
                <Textarea
                  placeholder="Write your notes here..."
                  className="w-full h-32 bg-transparent border-none focus:ring-0 resize-none placeholder-gray-500"
                  name='notes'
                  aria-label='notes'
                />
              </div>

              <Button className='text-[10px] py-1 mt-2'>Save Notes</Button>
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
