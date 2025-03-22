import { LoginForm } from '@/components/login-form'
import React from 'react'

const page = () => {
  return (
    <div className='w-full min-h-screen padding flex items-center justify-center flex-col bg-background'>
        <LoginForm/>
    </div>
  )
}

export default page