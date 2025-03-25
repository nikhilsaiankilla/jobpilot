import JobPostingCard from '@/components/job-posting-card'
import React from 'react'

const page = () => {
  return (
    <div className='w-full px-3 sm:px-5 md:px-10 py-5'>
      <h1 className='text-lg md:text-xl font-bold text-foreground'>Job Postings For You</h1>

      <hr className='my-2' />

      <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-6 gap-6'>
        <JobPostingCard
          jobId="12345"
          jobTitle="Frontend Developer"
          companyName="Google"
          postedOn="March 20, 2025"
          postedBy="John Doe"
          jobUrl="https://careers.google.com/job12345"
        />
      </div>

    </div>
  )
}

export default page