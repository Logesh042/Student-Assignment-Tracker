import { Assignment } from "@/types/assignment";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { formatDate, getDateStatusColor } from "@/utils/dateUtils";
import { Trash, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AssignmentCardProps {
  assignment: Assignment;
  onToggleComplete: (id: string) => void;
  onEdit: (assignment: Assignment) => void;
  onDelete: (id: string) => void;
}

export function AssignmentCard({ 
  assignment, 
  onToggleComplete, 
  onEdit, 
  onDelete 
}: AssignmentCardProps) {
  const { id, title, description, subject, dueDate, priority, completed } = assignment;
  
  const priorityColors = {
    low: "bg-priority-low",
    medium: "bg-priority-medium",
    high: "bg-priority-high"
  };
  
  return (
    <Card className={`w-full transition-all duration-300 animate-fade-in ${completed ? 'opacity-60' : ''}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Checkbox 
              id={`complete-${id}`}
              checked={completed}
              onCheckedChange={() => onToggleComplete(id)}
            />
            <CardTitle className={`text-lg ${completed ? 'line-through text-gray-500' : ''}`}>
              {title}
            </CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className={`${priorityColors[priority]} text-white`}>
              {priority}
            </Badge>
          </div>
        </div>
        <Badge variant="secondary">{subject}</Badge>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500 mb-2">{description}</p>
        <p className={`text-xs font-medium ${getDateStatusColor(dueDate)}`}>
          Due: {formatDate(dueDate)}
        </p>
      </CardContent>
      <CardFooter className="pt-0 flex justify-between">
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-blue-500 hover:text-blue-700 hover:bg-blue-50"
          onClick={() => onEdit(assignment)}
        >
          <Edit className="h-4 w-4 mr-1" /> Edit
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-red-500 hover:text-red-700 hover:bg-red-50"
          onClick={() => onDelete(id)}
        >
          <Trash className="h-4 w-4 mr-1" /> Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
