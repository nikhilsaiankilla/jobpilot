"use client";

import { LoadingSkeletonForNotes } from "@/components/LoadingSkeleton";
import { RootState } from "@/lib/store";
import { ArrowLeft, ArrowRight, NotebookPen, PlusIcon, Trash } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState, useTransition } from "react";
import { useSelector } from "react-redux";

const Page = () => {
  const pageSize = 5;
  const [page, setPage] = useState(1);
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [isPending, startTransition] = useTransition();

  const { user } = useSelector((state: RootState) => state?.auth);

  useEffect(() => {
    const fetchNotes = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(`/api/notes/getNotes?page=${page}&pageSize=${pageSize}&userId=${user?.id}`);
        const data = await response.json();

        if (data.success) {
          setNotes(data.notes);
          setTotalPages(data.totalPages);
        }
      } catch (error) {
        console.error("Error fetching notes:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNotes();
  }, [page]);

  return (
    <div className="w-full px-3 sm:px-5 md:px-10 py-5">
      <h1 className="text-lg md:text-xl font-bold text-foreground">Nikhil's Notes</h1>

      <hr className="mt-2" />

      {
        isLoading
          ?
          <LoadingSkeletonForNotes />
          :
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-6 gap-6">

            <Link
              href='/dashboard/add-notes'
              className="w-full aspect-square p-4 shadow-lg rounded-lg transform bg-secondary text-foreground rotate-3 mx-auto flex flex-col justify-center items-center gap-2 cursor-pointer"
            >
              <NotebookPen size={25} />
              <p className="text-sm mt-2 text-gray-700 dark:text-gray-200 my-2">Add New Notes</p>
              <PlusIcon size={25} />
            </Link>

            {
              notes?.map((note: any, index: number) => (
                <Link
                  href={`/dashboard/notes/${note?.id}`}
                  key={note?.id || index}
                  className={`relative w-full aspect-square mx-auto p-4 text-black shadow-lg rounded-lg transform rotate-3 cursor-pointer`}
                  style={{ backgroundColor: note.color || "#f5f5f5" }}
                >
                  <p className="text-lg font-semibold">{note?.content}</p>
                  <p className="text-sm mt-2 text-gray-700">{new Date(note?.createdAt).toLocaleDateString()}</p>

                  <Trash size={22} className="absolute right-4 text-red-600 bottom-4" />
                </Link>
              ))
            }
          </div>
      }

      {
        totalPages > 1
          ?
          <div className="mt-6 flex justify-center gap-3">
            <button
              onClick={() => startTransition(() => setPage((prev) => Math.max(prev - 1, 1)))}
              disabled={page === 1 || isPending}
              className="flex gap-1 items-center cursor-pointer disabled:text-gray-400"
            >
              <ArrowLeft size={16} /> Prev
            </button>
            <button
              onClick={() => startTransition(() => setPage((prev) => Math.min(prev + 1, totalPages)))}
              disabled={page === totalPages || isPending}
              className="flex gap-1 items-center cursor-pointer disabled:text-gray-400"
            >
              Next <ArrowRight size={16} />
            </button>
          </div>
          :
          ""
      }
    </div>
  );
};

export default Page;
