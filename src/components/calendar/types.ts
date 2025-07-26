import { Locale } from "date-fns";

// Our custom event type for calendar events
export interface CalendarEvent {
  notification_id: number;
  title: string;
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
    title: string;
    description?: string;
    time: Date;
  }) => void;
}
