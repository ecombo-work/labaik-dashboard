"use client";
import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { formatDate } from "date-fns";
import { Button } from "./ui/button";
export default function SingleDateCalendar({
  value,
  onChange,
  placeholder,
  ...props
}: {
  value: Date;
  onChange: (value: Date) => void;
  placeholder?: string;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          type="button"
          className="!flex !shadow-none !items-center !justify-start gap-2 bg-transparent hover:bg-transparent border !px-2"
        >
          <CalendarIcon className="ltr:mr-2 rtl:ml-2 h-4 w-4" />
          {value ? (
            formatDate(value, "yyyy-MM-dd")
          ) : (
            <p className="opacity-50">{placeholder}</p>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          defaultMonth={value}
          selected={value}
          onSelect={onChange}
          // className="rounded-lg border shadow-sm"
          // captionLayout="dropdown"
          required
          {...props}
        />
      </PopoverContent>
    </Popover>
  );
}
