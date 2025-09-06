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
import { Field, FieldElement } from "react-hook-form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
export default function SingleDateCalendar({
  value,
  onChange,
  ...props
}: {
  value: Date;
  onChange: (value: Date) => void;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          type="button"
          className="!h-9 w-full hover:bg-transparent flex items-center !justify-between border border-primary"
        >
          {value && formatDate(value, "yyyy-MM-dd")}
          <CalendarIcon className="ltr:ml-2 rtl:mr-2 h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          defaultMonth={value}
          selected={value}
          onSelect={onChange}
          className="rounded-lg border shadow-sm"
          captionLayout="dropdown"
          required
          {...props}
        />
      </PopoverContent>
    </Popover>
  );
}
