import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface HeaderProps {
  onAddNew: () => void;
}

export function Header({ onAddNew }: HeaderProps) {
  return (
    <header className="w-full bg-white py-4 px-4 md:px-6 border-b">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6 mr-2 text-blue-600"
          >
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
            <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
            <path d="m9 14 2 2 4-4" />
          </svg>
          <h1 className="text-xl font-bold text-gray-900">
            Student Assignment Tracker
          </h1>
        </div>
        <Button onClick={onAddNew} className="flex items-center">
          <Plus className="mr-1 h-4 w-4" /> Add Assignment
        </Button>
      </div>
    </header>
  );
}
