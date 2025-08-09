"use client";
import { useTheme } from "next-themes";
import { MainMenu } from "./main-menu";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

export const Header = () => {
  return (
   <header className="fixed top-0 left-0 w-full h-[64px] border-b border-zinc-800 bg-zinc-950">
    <div className="default_layout_width h-full flex justify-between items-center">
<Image src={"/fnx_logo.png"} width={500} height={300} className="h-[35px] object-contain w-fit" alt="app-logo" />
<div>
  <MainMenu/>
</div>
    </div>
   </header>
  );
};
