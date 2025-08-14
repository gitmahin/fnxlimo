"use client";
import { observer } from "mobx-react";
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
} from "lucide-react";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@fnx/ui";
import React, { useEffect } from "react";
import { Reservation } from "./reservation/reservation";
import { reservationServiceStore } from "@/services/store";

export const ReservationPopUp = observer(() => {
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        reservationServiceStore.setIspopup(!reservationServiceStore.isPopup);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);
  return (
    <CommandDialog
      open={reservationServiceStore.isPopup}
      onOpenChange={(open) => reservationServiceStore.setIspopup(open)}
      className="!max-w-[900px] !w-full"
    >
      <div className=" h-[calc(100vh-200px)]">
        <Reservation />
      </div>
    </CommandDialog>
  );
});
