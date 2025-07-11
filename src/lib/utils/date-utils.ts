import { format } from "date-fns";
export function formatDate(date: string): string {
  return format(date, "yyyy-MM-dd HH:mm a");
}
