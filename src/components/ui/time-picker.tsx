"use client";

import * as React from "react";
import { format, setHours, setMinutes, addMinutes, isToday } from "date-fns";
import { Clock, Clock9, Clock12, Clock3, Clock6, Sun, Moon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "./input";

interface TimePickerProps {
  date: Date;
  setDate: (date: Date) => void;
  className?: string;
}

const QUICK_TIMES = [
  { label: 'Morning', time: '09:00', icon: <Sun className="h-4 w-4" /> },
  { label: 'Noon', time: '12:00', icon: <Clock12 className="h-4 w-4" /> },
  { label: 'Afternoon', time: '15:00', icon: <Clock3 className="h-4 w-4" /> },
  { label: 'Evening', time: '18:00', icon: <Moon className="h-4 w-4" /> },
];

export function TimePicker({ date, setDate, className }: TimePickerProps) {
  const [timeString, setTimeString] = React.useState(
    format(date, "HH:mm")
  );
  const [isOpen, setIsOpen] = React.useState(false);

  const updateTime = (hours: number, minutes: number) => {
    const newDate = new Date(date);
    newDate.setHours(hours, minutes);
    setDate(newDate);
    setTimeString(format(newDate, 'HH:mm'));
    setIsOpen(false);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTimeString(value);
    
    // Parse the time string and update the date
    const [hours, minutes] = value.split(":").map(Number);
    if (!isNaN(hours) && !isNaN(minutes)) {
      updateTime(hours, minutes);
    }
  };

  const handleQuickTimeSelect = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    updateTime(hours, minutes);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild className="w-full">
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground",
            className
          )}
        >
          <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
          {timeString}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="center">
        <div className="p-4">
          <div className="grid grid-cols-4 gap-2 mb-4">
            {QUICK_TIMES.map(({ label, time, icon }) => (
              <Button
                key={time}
                variant="outline"
                size="sm"
                className="flex-col h-auto py-2 text-xs"
                onClick={() => handleQuickTimeSelect(time)}
              >
                <span className="mb-1">{icon}</span>
                <span>{time}</span>
                <span className="text-muted-foreground text-[10px] mt-1">{label}</span>
              </Button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Input
              type="time"
              value={timeString}
              onChange={handleTimeChange}
              className="flex-1"
              step="300" // 5 minute steps
            />
            <Button 
              type="button" 
              variant="outline" 
              size="sm"
              onClick={() => {
                const now = new Date();
                updateTime(now.getHours(), now.getMinutes());
              }}
            >
              Now
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
