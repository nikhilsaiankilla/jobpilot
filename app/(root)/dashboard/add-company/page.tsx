"use client";

import AddCompanyForm from "@/components/add-company-form"

const page = () => {

    return (
        <div className='w-full flex items-center flex-col bg-background min-h-screen p-6'>
            <div className="max-w-3xl w-full p-6 bg-secondary rounded-md shadow-sm">
                <div className='text-center'>
                    <h2 className="text-xl font-bold capitalize text-primary">Add new company</h2>
                    <p className="text-sm mt-2">
                        Thanks for contributing to database
                    </p>
                </div>
                <AddCompanyForm />
            </div>
        </div>
    )
}

export default page