import { cn } from "@/lib/utils";
import { CalendarEvent } from "./types";

interface EventIndicatorProps {
  notifications: CalendarEvent[];
  className?: string;
}

export function EventIndicator({ notifications, className = "" }: EventIndicatorProps) {
 
  const notificationCount = notifications.filter(e => e).length;
  
  const maxIndicators = 3;
  let eventIndicators = Math.min(maxIndicators);
  let notificationIndicators = 0;
  if (eventIndicators < maxIndicators) {
    notificationIndicators = Math.min(notificationCount, maxIndicators - eventIndicators);
  }

  return (
    <div className={cn("flex flex-wrap gap-0.5 mt-1", className)}>
      {Array.from({ length: notificationIndicators }).map((_, i) => (
        <span
          key={`notif-${i}`}
          className="h-1.5 w-1.5 rounded-full bg-blue-500"
          title={`${notificationCount} notification${notificationCount !== 1 ? 's' : ''}`}
        />
      ))}
    </div>
  );
}
