"use client";

import * as React from "react";
import { en, parseDate } from "chrono-node";
import { CalendarIcon } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Label,
  Input,
  Calendar,
  Button,
} from "@fnx/ui";

function formatDate(date: Date | undefined) {
  if (!date) {
    return "";
  }

  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

type Calendar29Props = {
  onValueChange?: (value: string) => void;
};

function toLocalISODate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // months are 0-indexed
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`; // YYYY-MM-DD in local timezone
}

export function Calendar29({ onValueChange }: Calendar29Props) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate()); // add 1 day
    return `${tomorrow.toISOString().split("T")[0]}`; // format: YYYY-MM-DD
  });
  const [date, setDate] = React.useState<Date | undefined>(
    parseDate(value) || undefined,
  );
  const [month, setMonth] = React.useState<Date | undefined>(date);

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="relative flex gap-2 w-full">
        <Input
          id="date"
          value={value}
          placeholder="Tomorrow or next week"
          className="bg-background pr-10 w-full"
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setOpen(true);
            }
          }}
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              id="date-picker"
              variant="ghost"
              className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
            >
              <CalendarIcon className="size-3.5" />
              <span className="sr-only">Select date</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="end">
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              month={month}
              onMonthChange={setMonth}
              onSelect={(date) => {
                if (!date) return;
                setDate(date);

                const iso = toLocalISODate(date); // ✅ local date
                setValue(iso);
                console.log("Local date:", iso);

                setOpen(false);
                if (onValueChange) onValueChange(iso);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
      {/* <div className="text-muted-foreground px-1 text-sm">
        Your post will be published on{" "}
        <span className="font-medium">{formatDate(date)}</span>.
      </div> */}
    </div>
  );
}
