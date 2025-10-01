import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CalendarEvent } from "../types";
import { cn } from "@/lib/utils";
import { Bell } from "lucide-react";
import { format } from "date-fns";
import { useDirLang } from "@/hooks/use-dir-lang";
function DayEventDialog({
  dayEvents,
  length,
}: {
  dayEvents: CalendarEvent[];
  length: number;
}) {
  const { lang } = useDirLang();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" size="sm">+ {length} more</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Day Events</DialogTitle>
          <DialogDescription>
            Here are your events for the selected day
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {dayEvents.map((event) => (
            <div
              key={event.notification_id}
              className={cn(
                "flex flex-col items-start gap-1 rounded-lg border p-2 text-xs leading-tight mb-1",
                "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800/50",
                "hover:shadow-sm transition-shadow"
              )}
            >
              <div className="flex items-center w-full">
                <Bell className="h-3 w-3 ltr:mr-1 rtl:ml-1 flex-shrink-0 text-blue-500" />
                <p className="text-base font-medium truncate">
                  {lang === "ar" ? event.title_ar : event.title_en}
                </p>
              </div>
              <p className="leading-none text-muted-foreground text-[12px]">
                {format(new Date(event.scheduled_at), "h:mm a")}
              </p>
            </div>
          ))}
        </div>
        <DialogFooter>
          <DialogClose>Close</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DayEventDialog;
