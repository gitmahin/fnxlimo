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
  Button,
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@fnx/ui";
import React, { useEffect, useState } from "react";
import { Reservation } from "./reservation/reservation";
import { reservationServiceStore } from "@/services/store";
import toast from "react-hot-toast";

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
    <Drawer
      open={reservationServiceStore.isPopup}
      dismissible={reservationServiceStore.isPopup ? false :  true}
      onOpenChange={(open) => reservationServiceStore.setIspopup(open)}
    >
      <DrawerContent className="!h-screen">
        <DrawerClose className="absolute right-2 top-2">
          <Button variant="outline" onClick={() => reservationServiceStore.setIspopup(false)}>Cancel</Button>
        </DrawerClose>
        <div className="!h-full rpopup">
          <Reservation />
        </div>
      </DrawerContent>
    </Drawer>
  );
});
