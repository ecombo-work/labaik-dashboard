import { formatInTimeZone } from "date-fns-tz";

const RIYADH_TIMEZONE = "Asia/Riyadh";

export function formatDate(date: string | Date): string {
  return formatInTimeZone(
    new Date(date), 
    RIYADH_TIMEZONE,
    "yyyy-MM-dd hh:mm a"
  );
}