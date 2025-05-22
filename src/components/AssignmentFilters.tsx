import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Priority } from "@/types/assignment";
import { Search } from "lucide-react";

export interface FilterOptions {
  searchQuery: string;
  statusFilter: "all" | "pending" | "completed";
  priorityFilter: "all" | Priority;
  subjectFilter: string;
}

interface AssignmentFiltersProps {
  options: FilterOptions;
  onChange: (options: FilterOptions) => void;
  subjects: string[];
}

export function AssignmentFilters({
  options,
  onChange,
  subjects,
}: AssignmentFiltersProps) {
  const [searchQuery, setSearchQuery] = useState(options.searchQuery);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onChange({ ...options, searchQuery });
  };

  return (
    <div className="bg-white p-4 rounded-lg border mb-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <form onSubmit={handleSearchSubmit} className="relative">
          <Input
            placeholder="Search assignments..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="pr-8"
          />
          <Button
            type="submit"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full"
          >
            <Search className="h-4 w-4" />
          </Button>
        </form>

        <Select
          value={options.statusFilter}
          onValueChange={(value) =>
            onChange({ ...options, statusFilter: value as "all" | "pending" | "completed" })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={options.priorityFilter}
          onValueChange={(value) =>
            onChange({ ...options, priorityFilter: value as "all" | Priority })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={options.subjectFilter}
          onValueChange={(value) =>
            onChange({ ...options, subjectFilter: value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Subject" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Subjects</SelectItem>
            {subjects.map((subject) => (
              <SelectItem key={subject} value={subject}>
                {subject}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
