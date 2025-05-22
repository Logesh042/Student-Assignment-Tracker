import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface EmptyStateProps {
  onAddNew: () => void;
}

export function EmptyState({ onAddNew }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 border-2 border-dashed border-gray-200 rounded-lg text-center">
      <div className="w-16 h-16 bg-blue-50 flex items-center justify-center rounded-full mb-4">
        <svg
          className="w-8 h-8 text-blue-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </div>
      <h3 className="text-xl font-medium text-gray-900 mb-2">
        No assignments yet
      </h3>
      <p className="text-gray-500 mb-6">
        Start tracking your assignments by adding your first task.
      </p>
      <Button onClick={onAddNew} className="flex items-center">
        <Plus className="mr-1 h-4 w-4" /> Add New Assignment
      </Button>
    </div>
  );
}
