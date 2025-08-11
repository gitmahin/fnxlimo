"use client";

import * as React from "react";
import Link from "next/link";
import {cn} from "@fnx/ui";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@fnx/ui";

export function MainMenu() {

  const goTotop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  return (
    <NavigationMenu viewport={false} className="shrink-0 ">
      <NavigationMenuList className="shrink-0 main_menu_header_f">
        <NavigationMenuItem  className="shrink-0">
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <div onClick={goTotop} className="cursor-pointer">Home</div>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem className="shrink-0">
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="#services">Service</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem className="shrink-0">
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="#fleet">Fleet</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem className="shrink-0">
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="#contact">Contact</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
