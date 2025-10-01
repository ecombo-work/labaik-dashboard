import { useState } from "react";
import { format, isSameDay } from "date-fns";
import { CalendarEvent } from "../types";
import { ScheduleNotifications } from "@/interfaces/notification";

export function useNotifications(data: ScheduleNotifications[], lang: string) {
  const [notifications, setNotifications] = useState<
    Record<string, CalendarEvent[]>
  >({});

  const addNotification = (notification: {
    day: Date;
    title_ar: string;
    title_en: string;
    message_ar: string;
    message_en: string;
    receiver: "performers" | "seekers" | "employees" | "all";
    scheduledAt: Date;
  }) => {
    const dayKey = format(notification.day, "yyyy-MM-dd");
    const newNotification: CalendarEvent = {
      notification_id: Date.now(),
      title_ar: notification.title_ar,
      title_en: notification.title_en,
      scheduled_at: notification.scheduledAt.toISOString(),
    };

    setNotifications((prev) => ({
      ...prev,
      [dayKey]: [...(prev[dayKey] || []), newNotification],
    }));
  };

  const getDayEvents = (day: Date) => {
    const dayKey = format(day, "yyyy-MM-dd");
    const dayData = data.find((item) => isSameDay(new Date(item.day), day));
    const dayNotifications = notifications[dayKey] || [];

    // Normalize API notifications (which have only `title`) to `CalendarEvent` shape
    const apiNotifications: CalendarEvent[] = (
      dayData?.notifications || []
    ).map((n) => ({
      notification_id: n.notification_id,
         title_ar: n.title_ar,
      title_en: n.title_en,
      scheduled_at: n.scheduled_at,
    }));

    return [...apiNotifications, ...dayNotifications].sort((a, b) =>
      a.scheduled_at.localeCompare(b.scheduled_at)
    );
  };

  return { addNotification, getDayEvents };
}
