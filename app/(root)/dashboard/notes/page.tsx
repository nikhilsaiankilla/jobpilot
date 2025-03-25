import { NotebookPen, PlusIcon, Trash } from 'lucide-react';
import React from 'react'

const page = () => {
  const notesData = [
    { id: 1, text: "Follow up with recruiter", date: "March 26, 2025" },
    { id: 2, text: "Update resume with latest project", date: "March 27, 2025" },
    { id: 3, text: "Prepare for interview on Friday", date: "March 28, 2025" },
    { id: 4, text: "Send thank you email to HR", date: "March 29, 2025" },
  ];

  const colors = ["bg-yellow-300", "bg-pink-300", "bg-green-300", "bg-blue-300"];

  return (
    <div className='w-full px-3 sm:px-5 md:px-10 py-5'>
      <h1 className='text-lg md:text-xl font-bold text-foreground'>Nikhil's Notes</h1>

      <hr className='mt-2'/>

      <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-6 gap-6'>
        <div
          className="relative w-56 md:w-auto aspect-video p-4 shadow-lg rounded-lg transform bg-secondary text-foreground rotate-3 mx-auto flex flex-col justify-center cursor-pointer"
        >
          <NotebookPen size={25} />
          <p className="text-sm mt-2 text-gray-700 dark:text-gray-200 my-2">Add New Notes</p>
        </div>


        {notesData.map((note, index) => (
          <div
            key={note.id}
            className={`relative w-56 md:w-auto aspect-video mx-auto p-4 text-black shadow-lg rounded-lg transform rotate-3 cursor-pointer ${colors[index % colors.length]} `}
          >
            <p className="text-lg font-semibold">{note.text}</p>
            <p className="text-sm mt-2 text-gray-700">{note.date}</p>

            <div className='absolute right-4 cursor-pointer bottom-4'>
              <Trash size={18} className='hover:text-red-600 text-gray-600' />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default page