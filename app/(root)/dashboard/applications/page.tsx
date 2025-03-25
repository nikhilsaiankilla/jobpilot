import { DataTable } from '@/components/data-table'
import React from 'react'

import data from "./../data.json"

const page = () => {
  return (
    <div className='w-full px-3 sm:px-5 md:px-10 py-5'>
      <DataTable data={data} />
    </div>
  )
}

export default page