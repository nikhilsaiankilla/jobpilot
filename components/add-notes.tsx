import React, { useState } from 'react'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';


const colors = {
  yellow: "bg-yellow-200",  // Soft pastel yellow
  blue: "bg-blue-200",      // Calm pastel blue
  pink: "bg-pink-200",      // Light and vibrant pink
  green: "bg-green-200",    // Fresh pastel green
  purple: "bg-purple-200",  // Subtle pastel purple
  orange: "bg-orange-200",  // Warm and friendly pastel orange
  teal: "bg-teal-200",      // Cool pastel teal
};

const AddNotes = () => {
  const [selectedColor, setSelectedColor] = useState<keyof typeof colors>("yellow");

  return (
    <>
      <div className="flex flex-col items-start">
        <Label className="text-muted-foreground">Notes</Label>

        {/* Color Picker */}
        <div className="flex gap-2 mt-2">
          {Object.keys(colors).map((color) => (
            <span
              key={color} // Use color name as key instead of index for better React performance
              onClick={() => setSelectedColor(color as keyof typeof colors)}
              className={`w-5 h-5 cursor-pointer rounded-full border-2 transition ${colors[color as keyof typeof colors]} ${selectedColor === color ? "border-gray-500" : "border-transparent"
                }`}
              role="button"
              aria-label={`Select ${color} color`} // Improves accessibility
              title={`Select ${color} color`} // Improves usability
            ></span>
          ))}
        </div>

        {/* Sticky Note */}
        <div
          className={`w-full mt-2 p-4 rounded-lg shadow-lg transition-shadow duration-300 ease-in-out hover:shadow-xl ${colors[selectedColor]} text-gray-900`}
        >
          <Textarea
            placeholder="Write your notes here..."
            className="w-full h-44 bg-transparent border-none focus:ring-0 resize-none placeholder-gray-500"
            name="notes"
            aria-label="notes"
          />
        </div>

        <Button className="text-[10px] py-1 mt-2 text-white cursor-pointer" title="Save Notes">Save Notes</Button>
      </div>
    </>
  )
}

export default AddNotes