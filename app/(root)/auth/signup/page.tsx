import { SignupForm } from '@/components/signup-form'
import React from 'react'

const page = () => {
  return (
    <div className='w-full min-h-screen padding flex items-center justify-center flex-col bg-background py-20'>
        <SignupForm/>
    </div>
  )
}

export default page