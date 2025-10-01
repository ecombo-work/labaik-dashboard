import { Locale } from "date-fns";

// Our custom event type for calendar events
export interface CalendarEvent {
  notification_id: number;
  title_ar: string;
  title_en: string;
  scheduled_at: string;
}

export interface CalendarData {
  day: Date;
  notifications: CalendarEvent[];
}

export interface CalendarBaseProps {
  dir?: "ltr" | "rtl";
  locale: Locale;
  isRTL: boolean;
  formatDayNumber: (date: Date) => string;
  onAddNotification?: (notification: {
    day: Date;
    title_ar: string;
    title_en: string;
    message_ar: string;
    message_en: string;
    receiver: "performers" | "seekers" | "employees" | "all";
    scheduledAt: Date;
  }) => void;
}
