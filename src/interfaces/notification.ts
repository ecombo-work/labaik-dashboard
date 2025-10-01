export interface ScheduleNotifications {
  day: string;
  notifications: {
    notification_id: number;
    title_ar: string;
    title_en: string;
    scheduled_at: string;
  }[];
}
