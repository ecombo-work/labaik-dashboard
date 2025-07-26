import { cn } from "@/lib/utils";
import { CalendarBaseProps } from "./types";

export function WeekDaysHeader({ weekDays, isRTL }: { weekDays: string[] } & Pick<CalendarBaseProps, 'isRTL'>) {
  return (
    <div className="grid grid-cols-7 border text-center text-xs font-semibold leading-6 lg:flex-none">
      {weekDays.map((day, i) => (
        <div
          key={i}
          className={cn(
            "py-2.5",
            i < 6 &&   'border-0 rtl:border-l ltr:border-r'
          )}
        >
          {day}
        </div>
      ))}
    </div>
  );
}
