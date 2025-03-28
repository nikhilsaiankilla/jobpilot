"use client";

import React, { useState } from "react";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { addNotesToDb } from "@/actions/noteActions";
import { Input } from "./ui/input";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

interface AddNotesProps {
  onSave: (noteId: string, content: string, color: keyof typeof colors) => void;
}

const colors = {
  yellow: "#FEF08A",
  blue: "#BFDBFE",
  pink: "#FBCFE8",
  green: "#BBF7D0",
  purple: "#E9D5FF",
  orange: "#FED7AA",
  teal: "#99F6E4",
} as const;

const AddNotes: React.FC<AddNotesProps> = ({ onSave }) => {
  const [selectedColor, setSelectedColor] = useState<keyof typeof colors>("yellow");
  const [noteContent, setNoteContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useSelector((state: RootState) => state?.auth);

  const handleSave = async () => {
    setIsLoading(true);
    if (!noteContent.trim()) return;
    const noteId = crypto.randomUUID();

    if(user?.id){
      await addNotesToDb(noteContent, colors[selectedColor], user?.id)
    }
    
    onSave(noteId, noteContent.trim(), selectedColor);
    setNoteContent("");
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col items-start">
      <Label className="text-muted-foreground">Notes</Label>

      {/* Color Picker */}
      <div className="flex gap-2 mt-2">
        {Object.entries(colors).map(([color, hex]) => (
          <span
            key={color}
            onClick={() => setSelectedColor(color as keyof typeof colors)}
            className={`w-5 h-5 cursor-pointer rounded-full border-2 transition ${selectedColor === color ? "border-gray-500" : "border-transparent"}`}
            style={{ backgroundColor: hex }}
            role="button"
            aria-label={`Select ${color} color`}
            title={`Select ${color} color`}
          />
        ))}
      </div>

      {/* Sticky Note */}
      <div
        className="w-full mt-5 p-4 rounded-lg shadow-xl"
        style={{ backgroundColor: colors[selectedColor], color: "#333", fontFamily: "cursive" }}
      >
        <Input className='w-full px-2 py-4 h-6 bg-transparent border-none focus:ring-0 resize-none placeholder-gray-600 text-lg' placeholder='Always start with title' />
      </div>

      <div className="w-full mt-2 p-4 rounded-lg shadow-lg transition-shadow duration-300 ease-in-out hover:shadow-xl" style={{ backgroundColor: colors[selectedColor], color: "#333" }}>
        <Textarea
          placeholder="Write your notes here..."
          className="w-full h-44 bg-transparent border-none focus:ring-0 resize-none placeholder-gray-500"
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
          aria-label="Notes input"
        />
      </div>

      <Button className="text-[10px] py-1 mt-2 text-white cursor-pointer" disabled={isLoading} title="Save Notes" onClick={handleSave}>
        {isLoading ? <><Loader2 size={22} className="animate-spin" /> saving Notes</> : "Save Notes"}
      </Button>
    </div>
  );
};

export default AddNotes;
