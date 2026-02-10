import { useState } from "react";
import { CircleEllipsis } from "lucide-react";

export default function MenuDropdown({ onEdit, onDelete }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="bg-white rounded-full p-1 shadow">
        <CircleEllipsis size={18} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 bg-white rounded shadow w-32 z-10">
          <button onClick={onEdit} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
            Update
          </button>
          <button onClick={onDelete} className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100">
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
