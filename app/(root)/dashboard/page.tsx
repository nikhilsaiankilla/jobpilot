"use client";

import { useRouter } from 'next/navigation';
import React from 'react';
import { logout } from '@/actions/auth/auth';

const Page = () => {
  const router = useRouter();

  const handleLogout = async () => {
    const { success } = await logout();
    
    if(success){
      router.push('/');
    }else{
      console.log('something went wrong');
    }
  };

  return (
    <div>
      <button onClick={handleLogout} className='cursor-pointer bg-red-500 text-white px-4 py-2 rounded'>
        Logout
      </button>
    </div>
  );
};

export default Page;
