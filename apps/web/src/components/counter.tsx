"use client";
import { Button, Input } from "@fnx/ui";
import { Minus, Plus } from "lucide-react";

type CounterType = {
  decrement: () => void;
  increment: () => void;
  value: number;
  maxLength: number;
  max: number;
  onChange: (value: number) => void;
};

export const Counter = ({
  decrement,
  increment,
  value,
  maxLength,
  max,
  onChange,
}: CounterType) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    if (/^\d*$/.test(newValue)) {
      const numericValue = parseInt(newValue || "0", 10);

      if (max !== undefined && numericValue > max) return;

      onChange(numericValue);
    }
  };

  return (
    <div className="flex justify-center items-center ">
      <Button
        disabled={value === 0}
        onClick={decrement}
        className="rounded-r-none cursor-pointer active:ring-2 ring-red-500"
        variant={"secondary"}
      >
        <Minus size={18} />
      </Button>
      <input
        type="text"
        value={value}
        maxLength={maxLength}
        max={max}
        onChange={handleChange}
        className="px-3 flex justify-center !w-[100px] text-center items-center border-y h-9"
      />
      <Button
        onClick={increment}
        className="rounded-l-none cursor-pointer active:ring-2"
        variant={"secondary"}
      >
        <Plus size={18} />
      </Button>
    </div>
  );
};
