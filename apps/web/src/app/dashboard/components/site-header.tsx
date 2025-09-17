"use client"
import { reservationServiceStore } from "@/services/store";
import { SidebarTrigger, Separator, Button,   Tooltip,
  TooltipContent,
  TooltipTrigger, } from "@fnx/ui";
import { PlusCircleIcon } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">Dashboard</h1>
        <div className="ml-auto flex items-center justify-end pr-2 gap-2">
           <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline" onClick={() => reservationServiceStore.setIspopup(true)}>
            <PlusCircleIcon/>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Create New Reservation</p>
      </TooltipContent>
    </Tooltip>
        
        </div>
      </div>
    </header>
  );
}
