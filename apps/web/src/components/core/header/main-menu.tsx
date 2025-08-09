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
  return (
    <NavigationMenu viewport={false} className="shrink-0">
      <NavigationMenuList className="shrink-0">
        <NavigationMenuItem  className="shrink-0">
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/">Home</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem className="shrink-0">
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="#service">Service</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem className="shrink-0">
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="#fleet">Fleet</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem className="shrink-0">
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="#fleet">Contact</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
