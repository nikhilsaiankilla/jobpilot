"use client";

import { addNotesToDb } from '@/actions/noteActions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RootState } from '@/lib/store';
import { Loader2 } from 'lucide-react';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';

const colors = {
  yellow: "#FEF08A",
  blue: "#BFDBFE",
  pink: "#FBCFE8",
  green: "#BBF7D0",
  purple: "#E9D5FF",
  orange: "#FED7AA",
  teal: "#99F6E4",
} as const;

const Page = () => {
  const [selectedColor, setSelectedColor] = useState<keyof typeof colors>("yellow");
  const [noteContent, setNoteContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useSelector((state: RootState) => state?.auth);

  const handleSave = async () => {
    setIsLoading(true);
    if (!noteContent.trim()) return;
    if (user?.id) {
      await addNotesToDb(noteContent, colors[selectedColor], user?.id);

      setNoteContent("");
    }
    setIsLoading(false);
  };

  return (
    <div className="w-full flex justify-center items-center min-h-screen">
      <div className="max-w-3xl w-full flex flex-col items-start">
        <Label className="text-muted-foreground text-lg font-semibold">Create Your Notes</Label>

        {/* Animated Color Picker */}
        <div className="flex gap-3 mt-3">
          {Object.entries(colors).map(([color, hex]) => (
            <span
              key={color}
              onClick={() => setSelectedColor(color as keyof typeof colors)}
              className={`w-7 h-7 rounded-full border-2 transition-all cursor-pointer duration-300 ${selectedColor === color ? "border-gray-800 scale-110 shadow-md" : "border-transparent"
                }`}
              style={{ backgroundColor: hex }}
              role="button"
              title={`Select ${color}`}
            />
          ))}
        </div>

        {/* Sticky Note Design */}
        <div
          className="w-full mt-5 p-4 rounded-lg shadow-xl"
          style={{ backgroundColor: colors[selectedColor], color: "#333", fontFamily: "cursive" }}
        >
          <Input className='w-full px-2 py-4 h-6 bg-transparent border-none focus:ring-0 resize-none placeholder-gray-600 text-lg' placeholder='Always start with title' />
        </div>
        <div
          className="w-full mt-5 p-6 rounded-lg shadow-xl"
          style={{ backgroundColor: colors[selectedColor], color: "#333", fontFamily: "cursive" }}
        >
          <Textarea
            placeholder="Write something amazing..."
            className="w-full min-h-96 bg-transparent border-none focus:ring-0 resize-none placeholder-gray-600 text-lg"
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
          />
        </div>

        {/* Save Button with Animation */}
        <Button
          className="mt-4 px-5 py-2 text-white font-semibold rounded-lg shadow-md hover:scale-105 transition-all"
          disabled={isLoading}
          onClick={handleSave}
        >
          {isLoading ? <><Loader2 size={22} className="animate-spin" /> Saving...</> : "Save Note"}
        </Button>
      </div>
    </div>
  );
};

export default Page;
