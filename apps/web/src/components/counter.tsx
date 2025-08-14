"use client";
import { Button } from "@fnx/ui";
import { Minus, Plus } from "lucide-react";

type CounterType = {
  decrement: () => void;
  increment: () => void;
  value: number;
};

export const Counter = ({ decrement, increment, value }: CounterType) => {
  return (
    <div className="flex justify-center items-center ">
      <Button
        onClick={decrement}
        className="rounded-r-none cursor-pointer active:ring-2 ring-red-500"
        variant={"secondary"}
      >
        <Minus size={18} />
      </Button>
      <div className="px-5 flex justify-center shrink-0 items-center border-y h-9">
        {value}
      </div>
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
