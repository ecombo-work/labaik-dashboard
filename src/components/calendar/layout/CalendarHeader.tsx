import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { CalendarBaseProps } from "../types";
import { useTranslations } from "next-intl";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

interface CalendarHeaderProps extends CalendarBaseProps {
  today: Date;
  firstDayCurrentMonth: Date;
  onGoToToday: () => void;
  formatDayNumber: (day: Date) => string;
}

export function CalendarHeader({
  today,
  firstDayCurrentMonth,
  onGoToToday,
  locale,
  isRTL,
  formatDayNumber,
}: CalendarHeaderProps) {
  const t = useTranslations("calendar");
  return (
    <div className="flex flex-col space-y-4 p-4 md:flex-row md:items-center md:justify-between md:space-y-0 lg:flex-none">
      <div className="flex flex-auto">
        <div className="flex items-center gap-4">
          <div className="hidden w-20 flex-col items-center justify-center rounded-lg border bg-muted p-0.5 md:flex">
            <h1 className="p-1 text-xs uppercase text-muted-foreground">
              {format(today, "MMMM", { locale }).toUpperCase()}
            </h1>
            <div className="flex w-full items-center justify-center rounded-lg border bg-background p-0.5 text-lg font-bold">
              <span>{format(today, "d", { locale })}</span>
            </div>
          </div>
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold text-foreground">
              {format(firstDayCurrentMonth, "MMMM yyyy", { locale })}
            </h2>
            <p className="text-sm text-muted-foreground">
              {format(firstDayCurrentMonth, "MMMM d, yyyy", { locale })} -{" "}
              {format(firstDayCurrentMonth, "MMMM d, yyyy", {
                locale,
              })}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Select 
            value={firstDayCurrentMonth.getMonth().toString()}
            onValueChange={(value) => {
              const newDate = new Date(firstDayCurrentMonth);
              newDate.setMonth(parseInt(value));
              window.dispatchEvent(new CustomEvent('monthChange', { detail: newDate }));
            }}
          >
            <SelectTrigger className="w-26">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 12 }, (_, i) => {
                const date = new Date(2000, i, 1);
                const monthName = format(date, "MMMM", { locale });

                return (
                  <SelectItem key={i} value={i.toString()}>
                    {monthName}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          
          <Select 
            value={firstDayCurrentMonth.getFullYear().toString()}
            onValueChange={(value) => {
              const newDate = new Date(firstDayCurrentMonth);
              newDate.setFullYear(parseInt(value));
              window.dispatchEvent(new CustomEvent('monthChange', { detail: newDate }));
            }}
          >
            <SelectTrigger className="w-26">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 11 }, (_, i) => {
                const year = new Date().getFullYear() - 5 + i;
                return (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
        
        <Button
          onClick={onGoToToday}
          variant="outline"
          className="ml-2 w-26"
        >
          {t('today')}
        </Button>
      </div>
    
    </div>
  );
}
