import { format, isPast, isToday, differenceInDays } from "date-fns";

export function formatDate(date: Date): string {
  return format(date, "MMM d, yyyy");
}

export function getDateStatus(date: Date): "overdue" | "today" | "upcoming" | "far" {
  if (isPast(date) && !isToday(date)) {
    return "overdue";
  }
  
  if (isToday(date)) {
    return "today";
  }
  
  const dayDiff = differenceInDays(date, new Date());
  
  if (dayDiff <= 3) {
    return "upcoming";
  }
  
  return "far";
}

export function getDateStatusColor(date: Date): string {
  const status = getDateStatus(date);
  
  switch(status) {
    case "overdue":
      return "text-red-500";
    case "today":
      return "text-amber-500";
    case "upcoming":
      return "text-blue-500";
    case "far":
    default:
      return "text-gray-500";
  }
}
