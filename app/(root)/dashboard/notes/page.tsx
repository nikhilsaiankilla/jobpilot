"use client";

import { NotebookPen, PlusIcon, Trash } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState, useTransition } from "react";

const Page = () => {
  const pageSize = 5;
  const [page, setPage] = useState(1);
  const [notes, setNotes] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isPending, startTransition] = useTransition();

  const YOUR_USER_ID = "cm8k6i04y000dv3k02gif5p4w";

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch(`/api/notes/getNotes?page=${page}&pageSize=${pageSize}&userId=${YOUR_USER_ID}`);
        const data = await response.json();

        if (data.success) {
          setNotes(data.notes);
          setTotalPages(data.totalPages);
        }
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchNotes();
  }, [page]);

  return (
    <div className="w-full px-3 sm:px-5 md:px-10 py-5">
      <h1 className="text-lg md:text-xl font-bold text-foreground">Nikhil's Notes</h1>

      <hr className="mt-2" />

      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-6 gap-6">
        <div
          className="relative w-56 md:w-auto aspect-video p-4 shadow-lg rounded-lg transform bg-secondary text-foreground rotate-3 mx-auto flex flex-col justify-center cursor-pointer"
        >
          <NotebookPen size={25} />
          <Link href='/dashboard/add-notes' className="text-sm mt-2 text-gray-700 dark:text-gray-200 my-2">Add New Notes</Link>
          <PlusIcon size={25} />
        </div>

        {notes.map((note: any) => (
          <div
            key={note.id}
            className={`relative w-56 md:w-auto aspect-video mx-auto p-4 text-black shadow-lg rounded-lg transform rotate-3 cursor-pointer`}
            style={{ backgroundColor: note.color }}
          >
            <p className="text-lg font-semibold">{note.content}</p>
            <p className="text-sm mt-2 text-gray-700">{new Date(note.createdAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-center gap-3">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-lg font-semibold">{page} / {totalPages}</span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Page;
