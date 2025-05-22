const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Your Blank App</h1>
        <p className="text-xl text-gray-600">Start building your amazing project here!</p>
      </div>
      import { useState, useEffect } from "react";
import { Assignment, AssignmentFormData } from "@/types/assignment";
import { AssignmentCard } from "@/components/AssignmentCard";
import { AssignmentFormDialog } from "@/components/AssignmentFormDialog";
import { EmptyState } from "@/components/EmptyState";
import { Header } from "@/components/Header";
import { AssignmentFilters, FilterOptions } from "@/components/AssignmentFilters";
import { generateId } from "@/utils/idGenerator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

// Sample assignments data
const sampleAssignments: Assignment[] = [
  {
    id: "sample1",
    title: "Physics Lab Report",
    description: "Complete the lab report on motion experiments",
    subject: "Physics",
    dueDate: new Date(Date.now() + 86400000 * 2), // 2 days from now
    priority: "high",
    completed: false,
    createdAt: new Date(),
  },
  {
    id: "sample2",
    title: "Literature Review",
    description: "Write a review on 'To Kill a Mockingbird'",
    subject: "English",
    dueDate: new Date(Date.now() + 86400000 * 7), // 7 days from now
    priority: "medium",
    completed: false,
    createdAt: new Date(),
  },
  {
    id: "sample3",
    title: "Algorithm Assignment",
    description: "Implement sorting algorithms in Python",
    subject: "Computer Science",
    dueDate: new Date(Date.now() + 86400000 * 3), // 3 days from now
    priority: "high",
    completed: false,
    createdAt: new Date(),
  },
];

const Index = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState<Assignment | undefined>(undefined);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { toast } = useToast();
  
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    searchQuery: "",
    statusFilter: "all",
    priorityFilter: "all",
    subjectFilter: "all",
  });

  // Load sample data on first render
  useEffect(() => {
    setAssignments(sampleAssignments);
  }, []);

  const subjects = Array.from(
    new Set(assignments.map((assignment) => assignment.subject))
  );

  const handleOpenForm = () => {
    setEditingAssignment(undefined);
    setIsFormOpen(true);
  };

  const handleEditAssignment = (assignment: Assignment) => {
    setEditingAssignment(assignment);
    setIsFormOpen(true);
  };

  const handleFormSubmit = (data: AssignmentFormData) => {
    if (editingAssignment) {
      // Update existing assignment
      setAssignments((prevAssignments) =>
        prevAssignments.map((assignment) =>
          assignment.id === editingAssignment.id
            ? {
                ...assignment,
                ...data,
              }
            : assignment
        )
      );
      toast({
        title: "Assignment Updated",
        description: `${data.title} has been updated.`,
      });
    } else {
      // Create new assignment
      const newAssignment: Assignment = {
        id: generateId(),
        ...data,
        completed: false,
        createdAt: new Date(),
      };
      setAssignments((prevAssignments) => [...prevAssignments, newAssignment]);
      toast({
        title: "Assignment Added",
        description: `${data.title} has been added to your list.`,
      });
    }
    setIsFormOpen(false);
  };

  const handleToggleComplete = (id: string) => {
    setAssignments((prevAssignments) =>
      prevAssignments.map((assignment) =>
        assignment.id === id
          ? { ...assignment, completed: !assignment.completed }
          : assignment
      )
    );
    
    // Get the title for toast
    const assignment = assignments.find(a => a.id === id);
    if (assignment) {
      const status = !assignment.completed ? 'completed' : 'marked as pending';
      toast({
        title: `Assignment ${status}`,
        description: `${assignment.title} has been ${status}.`,
      });
    }
  };

  const handleDelete = (id: string) => {
    setDeleteId(id);
  };

  const confirmDelete = () => {
    if (deleteId) {
      const assignmentToDelete = assignments.find(a => a.id === deleteId);
      setAssignments((prevAssignments) =>
        prevAssignments.filter((assignment) => assignment.id !== deleteId)
      );
      
      if (assignmentToDelete) {
        toast({
          title: "Assignment Deleted",
          description: `${assignmentToDelete.title} has been deleted.`,
          variant: "destructive",
        });
      }
      
      setDeleteId(null);
    }
  };

  const filterAssignments = (assignments: Assignment[]) => {
    return assignments.filter((assignment) => {
      // Filter by search query
      const matchesQuery =
        filterOptions.searchQuery === "" ||
        assignment.title
          .toLowerCase()
          .includes(filterOptions.searchQuery.toLowerCase()) ||
        assignment.description
          .toLowerCase()
          .includes(filterOptions.searchQuery.toLowerCase());

      // Filter by status
      const matchesStatus =
        filterOptions.statusFilter === "all" ||
        (filterOptions.statusFilter === "completed" && assignment.completed) ||
        (filterOptions.statusFilter === "pending" && !assignment.completed);

      // Filter by priority
      const matchesPriority =
        filterOptions.priorityFilter === "all" ||
        assignment.priority === filterOptions.priorityFilter;

      // Filter by subject
      const matchesSubject =
        filterOptions.subjectFilter === "all" ||
        assignment.subject === filterOptions.subjectFilter;

      return matchesQuery && matchesStatus && matchesPriority && matchesSubject;
    });
  };

  const filteredAssignments = filterAssignments(assignments);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onAddNew={handleOpenForm} />
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        <AssignmentFilters
          options={filterOptions}
          onChange={setFilterOptions}
          subjects={subjects}
        />
        
        {assignments.length === 0 ? (
          <EmptyState onAddNew={handleOpenForm} />
        ) : (
          <div className="space-y-6">
            {filteredAssignments.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No assignments match your filters.</p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {filteredAssignments.map((assignment) => (
                  <AssignmentCard
                    key={assignment.id}
                    assignment={assignment}
                    onToggleComplete={handleToggleComplete}
                    onEdit={handleEditAssignment}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      <AssignmentFormDialog
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSubmit={handleFormSubmit}
        existingAssignment={editingAssignment}
      />

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this assignment. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Index;
