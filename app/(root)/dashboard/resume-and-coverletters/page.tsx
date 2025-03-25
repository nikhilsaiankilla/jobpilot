import UploadDocumentCard from '@/components/add-resume'
import { Plus, Trash } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const page = () => {
  return (
    <div className='w-full px-3 sm:px-5 md:px-10 py-5'>
      <h1 className='text-lg md:text-xl font-bold text-foreground'>Your Resume&apos;s</h1>

      <hr className='mt-2' />

      <div className='w-full grid grid-cols-2 md:grid-cols-4 mt-6 gap-6'>

        <UploadDocumentCard type="resume" />

        <div className="relative w-full aspect-w-2 aspect-h-3 p-4 shadow-sm rounded-md bg-secondary text-foreground group">
          {/* Trash Icon (Hidden by Default, Shown on Hover) */}
          <button className="absolute cursor-pointer top-2 right-2 p-1 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <Trash size={18} />
          </button>

          {/* Resume Image */}
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3n4_QYc5yvprpVuhXk1ukVdyx_Fo0U2qZTw&s"
            alt="resume"
            width={100}
            height={100}
            className="w-full aspect-w-2 aspect-h-3"
          />

          {/* Resume Info */}
          <div className="w-full mt-2">
            <h2 className='text-sm'>nikhilresume.pdf</h2>
            <span className="flex items-center justify-between flex-col md:flex-row mt-1 text-sm text-gray-400">
              <p>19/2/2023</p>
              <p>5 days ago</p>
            </span>
          </div>
        </div>


      </div>

      <h1 className='text-lg md:text-xl font-bold text-foreground mt-16'>Your cover letter&apos;s</h1>

      <hr className='mt-2' />

      <div className='w-full grid grid-cols-2 md:grid-cols-4 mt-6 gap-6'>

        <UploadDocumentCard type='cover_letter'/>

        <div className="relative w-full aspect-w-2 aspect-h-3 p-4 shadow-sm rounded-md bg-secondary text-foreground group">
          {/* Trash Icon (Hidden by Default, Shown on Hover) */}
          <button className="absolute cursor-pointer top-2 right-2 p-1 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <Trash size={18} />
          </button>

          {/* Resume Image */}
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3n4_QYc5yvprpVuhXk1ukVdyx_Fo0U2qZTw&s"
            alt="resume"
            width={100}
            height={100}
            className="w-full aspect-w-2 aspect-h-3"
          />

          {/* Resume Info */}
          <div className="w-full mt-2">
            <h2 className='text-sm'>nikhilresume.pdf</h2>
            <span className="flex items-center justify-between flex-col md:flex-row mt-1 text-sm text-gray-400">
              <p>19/2/2023</p>
              <p>5 days ago</p>
            </span>
          </div>
        </div>
        <div className="relative w-full aspect-w-2 aspect-h-3 p-4 shadow-sm rounded-md bg-secondary text-foreground group">
          {/* Trash Icon (Hidden by Default, Shown on Hover) */}
          <button className="absolute cursor-pointer top-2 right-2 p-1 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <Trash size={18} />
          </button>

          {/* Resume Image */}
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3n4_QYc5yvprpVuhXk1ukVdyx_Fo0U2qZTw&s"
            alt="resume"
            width={100}
            height={100}
            className="w-full aspect-w-2 aspect-h-3"
          />

          {/* Resume Info */}
          <div className="w-full mt-2">
            <h2 className='text-sm'>nikhilresume.pdf</h2>
            <span className="flex items-center justify-between flex-col md:flex-row mt-1 text-sm text-gray-400">
              <p>19/2/2023</p>
              <p>5 days ago</p>
            </span>
          </div>
        </div>

      </div>
    </div>
  )
}

export default page