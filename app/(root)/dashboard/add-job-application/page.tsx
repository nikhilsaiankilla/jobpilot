"use client"

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { CalendarIcon, Check, ChevronsUpDown, Loader2 } from 'lucide-react'
import React, { useCallback, useEffect, useState } from 'react'
import { format } from "date-fns"
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { debounce } from 'lodash'
import AddCompanyForm from '@/components/add-company-form'
import AddNotes from '@/components/add-notes'

interface Company {
  id: string,
  name: string;
  logoUrl: string;
}


const page = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [file, setFile] = useState<File | null>(null);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [open, setOpen] = useState(false);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // Debounced search function
  const searchCompanies = useCallback(
    debounce(async (query: string) => {
      if (!query) {
        setCompanies([]);
        return;
      }

      setIsSearching(true);
      try {
        const response = await fetch(`/api/companies?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        setCompanies(data);
      } catch (error) {
        console.error('Error searching companies:', error);
      } finally {
        setIsSearching(false);
      }
    }, 300), // 300ms debounce delay
    []
  );

  useEffect(() => {
    const fetchIntialCompanies = async () => {
      setIsSearching(true);
      try {
        const response = await fetch(`/api/companies`);
        const data = await response.json();
        setCompanies(data);
      } catch (error) {
        console.error('Error searching companies:', error);
      } finally {
        setIsSearching(false);
      }
    }
    fetchIntialCompanies();
  }, [])

  // Handle search input change
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    searchCompanies(value);
  };

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

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    formData.append('companyId',selectedCompany)
    console.log(formData.get('companyId'));
  }
  return (
    <div className='w-full flex items-center flex-col bg-background min-h-screen p-6'>
      <Card className='w-full max-w-4xl mt-5 rounded-lg bg-secondary shadow-lg border border-border'>
        <CardHeader className='text-center'>
          <CardTitle className='text-2xl font-semibold text-foreground'>Add Job Application</CardTitle>
          <CardDescription className='text-muted-foreground'>Track your job applications easily</CardDescription>
        </CardHeader>
        <CardContent>

          {/* ADD JOB APPLICATION FORM  */}
          <form onSubmit={submitForm} className='w-full flex flex-col gap-6'>

            {/* JOB TITLE  */}
            <div>
              <Label className='text-muted-foreground'>Job Title</Label>
              <Input placeholder='Enter Job Title' className='w-full mt-2' type='text' name='title' aria-label='job-application-title' />
            </div>

            {/* COMPANIES  */}
            <div>
              <Label className="text-muted-foreground my-3">Company</Label>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
                    {selectedCompany
                      ? companies.find((company) => company.name === selectedCompany)?.name
                      : "Select a company..."}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full! p-0">
                  <Command className='w-full'>
                    <CommandInput
                      placeholder="Search company..."
                      className="h-9 w-full"
                      value={searchQuery}
                      onValueChange={handleSearchChange}
                    />
                    <CommandList className='w-full!'>
                      <CommandEmpty>
                        <div className='flex flex-col items-center'>
                          <span className='my-3'>No company found.</span>

                          {/* dialog box to add company  */}

                          <Dialog>
                            <DialogTrigger asChild>
                              <Button>Add New Company</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px] md:max-w-3xl">

                              <DialogHeader className='text-center'>
                                <DialogTitle>Add new company</DialogTitle>
                                <DialogDescription>
                                  Thanks for helping other users
                                </DialogDescription>
                              </DialogHeader>

                              {/* ADD COMPANIES FORM  */}
                              <AddCompanyForm />

                            </DialogContent>
                          </Dialog>
                        </div>
                      </CommandEmpty>
                      <CommandGroup className='w-full!'>
                        {companies.map((company) => (
                          isSearching
                            ?
                            <Loader2 size={18} className='animate-spin' />
                            :
                            <CommandItem
                              key={company.id}
                              value={company.name}
                              onSelect={(currentValue) => {
                                setSelectedCompany(currentValue === selectedCompany ? "" : currentValue);
                                setSearchQuery(currentValue === selectedCompany ? "" : currentValue);
                                setOpen(false);
                              }}
                              className="flex items-center gap-3"
                            >
                              <Image src={company?.logoUrl} alt={company.name} width={20} height={20} />
                              {company.name}
                              <Check
                                className={cn(
                                  "ml-auto",
                                  selectedCompany === company.name ? "opacity-100" : "opacity-0"
                                )}
                              />
                            </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              {/* Location Field - Helps search engines understand job location context */}
              <div>
                {/* Label for location input, improves accessibility and SEO */}
                <Label className='text-muted-foreground' htmlFor="job-location">
                  Location
                </Label>
                {/* Input for job location, includes placeholder and aria-label for accessibility */}
                <Input
                  id="job-location" // Added id for label association
                  placeholder='Enter Location'
                  className='w-full mt-2'
                  type='text'
                  name='location'
                  aria-label='Job location input field' // Enhanced aria-label
                />
              </div>

              {/* Status Field - Indicates job application status, useful for job tracking */}
              <div>
                {/* Label for status select, improves accessibility */}
                <Label className='text-muted-foreground' htmlFor="job-status">
                  Status
                </Label>
                {/* Select component for job status */}
                <Select name='job-status' aria-label="Job application status">
                  {/* Trigger button for status dropdown */}
                  <SelectTrigger
                    id="job-status" // Added id for label association
                    className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive mt-2"
                  >
                    <SelectValue placeholder="Job Status" />
                  </SelectTrigger>
                  {/* Dropdown content with job status options */}
                  <SelectContent className='w-full bg-secondary border border-border rounded-lg shadow-lg' position="popper">
                    <SelectGroup className='px-3 py-2'>
                      {/* Group label for status options */}
                      <SelectLabel>Status</SelectLabel>
                      {/* Status options with meaningful values for better SEO and usability */}
                      <SelectItem value="not-applied" className='hover:bg-secondary transition-all duration-150 ease-in'>
                        Not Yet Applied
                      </SelectItem>
                      <SelectItem value="applied" className='hover:bg-secondary transition-all duration-150 ease-in'>
                        Applied
                      </SelectItem>
                      <SelectItem value="in-progress" className='hover:bg-secondary transition-all duration-150 ease-in'>
                        Progress
                      </SelectItem>
                      <SelectItem value="withdrawn" className='hover:bg-secondary transition-all duration-150 ease-in'>
                        Withdrawn
                      </SelectItem>
                      <SelectItem value="rejected" className='hover:bg-secondary transition-all duration-150 ease-in'>
                        Rejected
                      </SelectItem>
                      <SelectItem value="offer-received" className='hover:bg-secondary transition-all duration-150 ease-in'>
                        Offer Received
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* Applied Date Field - Tracks application date, useful for job timeline */}
              <div>
                {/* Label for date picker, improves accessibility */}
                <Label className='text-muted-foreground mb-2' htmlFor="applied-date">
                  Applied Date
                </Label>
                {/* Popover for date selection */}
                <Popover>
                  {/* Button to trigger date picker */}
                  <PopoverTrigger asChild>
                    <Button
                      id="applied-date" // Added id for label association
                      variant="outline"
                      className={`w-full pl-3 text-left font-normal ${!selectedDate ? "text-muted-foreground" : ""}`}
                      aria-label="Select application date" // Added for accessibility
                    >
                      {/* Display selected date or placeholder */}
                      {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  {/* Calendar content for date selection */}
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                      initialFocus
                      captionLayout="dropdown-buttons" // Enhances usability
                      aria-label="Job application date picker" // Added for accessibility
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Grid layout for job type and salary details, responsive for mobile and desktop */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {/* Job Type section - Categorizes employment type for job listings */}
              <div>
                {/* Label for job type dropdown, linked for accessibility */}
                <Label
                  className='text-muted-foreground'
                  htmlFor="job-type-select" // Associates label with SelectTrigger
                >
                  Job Type
                </Label>
                {/* Dropdown for selecting job type, optimized for accessibility */}
                <Select
                  name='job-type'
                  aria-label="Select job type for application" // Descriptive aria-label for SEO and screen readers
                >
                  {/* Trigger button for job type dropdown, styled for usability */}
                  <SelectTrigger
                    id="job-type-select" // Matches htmlFor from Label
                    className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive mt-2"
                  >
                    {/* Placeholder for job type selection */}
                    <SelectValue placeholder="Select Job Type" /> {/* Updated placeholder for clarity */}
                  </SelectTrigger>
                  {/* Dropdown content with job type options */}
                  <SelectContent
                    className='w-full bg-secondary border border-border rounded-lg shadow-lg'
                    position="popper"
                  >
                    {/* Group of job type options */}
                    <SelectGroup className='px-3 py-2'>
                      {/* Label for job type group, provides context */}
                      <SelectLabel>Job Type</SelectLabel>
                      {/* Job type options with SEO-friendly values */}
                      <SelectItem
                        value="full-time" // Lowercase, hyphenated for consistency and SEO
                        className='hover:bg-secondary transition-all duration-150 ease-in'
                      >
                        Full Time
                      </SelectItem>
                      <SelectItem
                        value="part-time"
                        className='hover:bg-secondary transition-all duration-150 ease-in'
                      >
                        Part Time
                      </SelectItem>
                      <SelectItem
                        value="internship"
                        className='hover:bg-secondary transition-all duration-150 ease-in'
                      >
                        Internship
                      </SelectItem>
                      <SelectItem
                        value="apprenticeship" // Corrected typo from "Appercationship"
                        className='hover:bg-secondary transition-all duration-150 ease-in'
                      >
                        Apprenticeship {/* Corrected spelling */}
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* Expected Salary section - Tracks salary expectations for job application */}
              <div>
                {/* Label for salary input and dropdown, improves accessibility */}
                <Label
                  className='text-muted-foreground'
                  htmlFor="salary-input" // Links to the salary input
                >
                  Expected Salary
                </Label>
                {/* Flex container for salary amount and currency selection */}
                <div className='flex gap-2 items-center'>
                  {/* Number input for salary amount */}
                  <Input
                    id="salary-input" // Matches htmlFor from Label
                    placeholder='Enter Salary Amount' // More descriptive placeholder
                    className='w-3/5 mt-2'
                    type='number'
                    name='salary'
                    aria-label='Enter expected salary amount for job application' // Detailed aria-label
                  />
                  {/* Dropdown for selecting currency */}
                  <Select
                    name='currency'
                    aria-label="Select currency for expected salary" // Descriptive aria-label
                  >
                    {/* Trigger button for currency dropdown */}
                    <SelectTrigger
                      id="currency-select" // Unique ID for currency dropdown
                      className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-2/5 min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive mt-2"
                    >
                      {/* Placeholder for currency selection */}
                      <SelectValue placeholder="INR" />
                    </SelectTrigger>
                    {/* Dropdown content with currency options */}
                    <SelectContent
                      className='w-full bg-secondary border border-border rounded-lg shadow-lg'
                      position="popper"
                    >
                      {/* Group of currency options */}
                      <SelectGroup className='px-3 py-2'>
                        {/* Label for currency group, corrected from "Status" */}
                        <SelectLabel>Currency</SelectLabel> {/* Fixed label to match context */}
                        {/* Currency options with meaningful values */}
                        <SelectItem
                          value="INR" // Updated to use actual currency codes
                          className='hover:bg-secondary transition-all duration-150 ease-in'
                        >
                          INR
                        </SelectItem>
                        <SelectItem
                          value="USD"
                          className='hover:bg-secondary transition-all duration-150 ease-in'
                        >
                          USD
                        </SelectItem>
                        <SelectItem
                          value="EUR"
                          className='hover:bg-secondary transition-all duration-150 ease-in'
                        >
                          EUR
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>


            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {/* Job Source Dropdown */}
              <div>
                <Label className='text-muted-foreground'>Job Source</Label>

                {/* Select component for choosing job source */}
                <Select name='job-source' aria-label="Select Job Source">
                  <SelectTrigger
                    className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary 
                   selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full 
                   min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs 
                   transition-[color,box-shadow] outline-none file:inline-flex file:h-7 
                   file:border-0 file:bg-transparent file:text-sm file:font-medium 
                   disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 
                   md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 
                   focus-visible:ring-[3px] aria-invalid:ring-destructive/20 
                   dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive mt-2"
                    aria-label="Select a job source"
                  >
                    <SelectValue placeholder="Select a Job Source" />
                  </SelectTrigger>

                  {/* Dropdown content with job source options */}
                  <SelectContent
                    className='w-full bg-secondary border border-border rounded-lg shadow-lg'
                    position="popper"
                  >
                    <SelectGroup className='px-3 py-2'>
                      <SelectLabel>Job Source</SelectLabel>
                      <SelectItem value="linkedin" className='hover:bg-secondary transition-all duration-150 ease-in'>LinkedIn</SelectItem>
                      <SelectItem value="glassdoor" className='hover:bg-secondary transition-all duration-150 ease-in'>Glassdoor</SelectItem>
                      <SelectItem value="naukri" className='hover:bg-secondary transition-all duration-150 ease-in'>Naukri</SelectItem>
                      <SelectItem value="withdrawn" className='hover:bg-secondary transition-all duration-150 ease-in'>Withdrawn</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* Job ID Input Field */}
              <div>
                <Label className='text-muted-foreground'>Job ID</Label>
                {/* Input field for entering job ID */}
                <Input
                  placeholder='Enter the Job ID'
                  className='w-full mt-2'
                  type='text'
                  name='job-id'
                  aria-label='Enter Job ID'
                />
              </div>
            </div>


            <div>
              {/* Job Posting URL Input */}
              <Label className='text-muted-foreground'>Job Posting URL</Label>

              <Input
                placeholder='Enter the Job Posting URL'
                className='w-full mt-2'
                type='url'  // Changed to 'url' for better validation
                name='job-url'
                aria-label='Enter Job Posting URL'
              />
            </div>

            <div>
              {/* Job Description Text Area */}
              <Label className='text-muted-foreground'>Job Description</Label>

              <Textarea
                placeholder='Enter the Job Description (Copy & Paste from job listing)'
                className='w-full h-32 mt-2'
                name='job-description'
                aria-label='Enter Job Description'
              />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>

              {/* Resume Upload */}
              <div>
                <Label className='text-muted-foreground'>Resume</Label>
                <div
                  className={cn(
                    "w-full mt-2 border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition",
                    "border-gray-300 hover:border-gray-500"
                  )}
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()} // Prevent default drag behavior
                  onClick={() => document.getElementById("resumeInput")?.click()} // Trigger input on click
                >
                  <Input
                    id="resumeInput" // Unique ID for resume upload
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

              {/* Cover Letter Upload */}
              <div>
                <Label className="text-muted-foreground">Cover letter</Label>
                <div
                  className={cn(
                    "w-full mt-2 border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition",
                    "border-gray-300 hover:border-gray-500"
                  )}
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()} // Prevent default drag behavior
                  onClick={() => document.getElementById("coverLetterInput")?.click()} // Trigger input on click
                >
                  <Input
                    id="coverLetterInput" // Unique ID for cover letter upload
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                    name='cover-letter'
                  />

                  {file ? (
                    <p className="text-sm text-gray-700">{file.name}</p>
                  ) : (
                    <p className="text-sm text-gray-500">Drag & Drop or Click to Upload</p>
                  )}
                </div>
              </div>
            </div>

            <AddNotes />

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
