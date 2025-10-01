import { cn } from "@/lib/utils";
import { CalendarBaseProps } from "../types";

export function WeekDaysHeader({
  weekDays,
}: { weekDays: string[] } & Pick<CalendarBaseProps, "isRTL">) {
  return (
    <div className="grid grid-cols-7 border-t border-x-0 text-center text-xs font-semibold leading-6 lg:flex-none">
      {weekDays.map((day, i) => (
        <div
          key={i}
          className={cn(
            "py-2.5 border-l",
            "border-b-0"
          )}
        >
          {day}
        </div>
      ))}
    </div>
  );
}
