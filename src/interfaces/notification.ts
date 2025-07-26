export interface ScheduleNotifications {
  day: string;
  notifications: {
    notification_id: number;
    title: string;
    scheduled_at: string;
  }[];
}
