export type Priority = 'low' | 'medium' | 'high';

export interface Assignment {
  id: string;
  title: string;
  description: string;
  subject: string;
  dueDate: Date;
  priority: Priority;
  completed: boolean;
  createdAt: Date;
}

export interface AssignmentFormData {
  title: string;
  description: string;
  subject: string;
  dueDate: Date;
  priority: Priority;
}
