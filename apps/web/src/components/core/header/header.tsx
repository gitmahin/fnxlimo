"use client";
import { useTheme } from "next-themes";
import { MainMenu } from "./main-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@fnx/ui";
import Image from "next/image";

import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { AlignRight } from "lucide-react";
import { reservationServiceStore } from "@/services/store";
import { ProductService } from "@/services";

const productService = new ProductService();

export const Header = () => {
  const handleGetProducts = async () => {
    const response = await productService.getProducts();
    console.log(response);
  };
  return (
    <header className="fixed px-5 top-0 left-0 w-full h-[64px] border-b z-50 border-zinc-800 bg-zinc-950">
      <div className="default_layout_width h-full flex justify-between items-center">
        <Image
          src={"/fnx_logo.png"}
          width={500}
          height={300}
          className="h-[35px] object-contain w-fit"
          alt="app-logo"
        />
        <div className="menu_header ">
          <div className="menu_header_desktop flex justify-end items-center gap-3">
            <MainMenu />
            <Link href="/auth/login">
              <Button color="gray" variant="soft" radius="large">
                Login
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button color="purple" variant="surface" radius="large">
                Sign up
              </Button>
            </Link>
            <Button
              color="purple"
              radius="large"
              className="!cursor-pointer"
              onClick={() => reservationServiceStore.setIspopup(true)}
            >
              Book Now
            </Button>
          </div>
          <div className="hidden mobile_menu">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  className="!w-[30px] !h-[30px] flex justify-center items-center !p-0"
                  radius="full"
                  color="gray"
                  variant="surface"
                >
                  <AlignRight size={18} />
                </Button>
              </SheetTrigger>
              <SheetContent className="px-2 text-left">
                <Link href="/auth/login">
                 
                    Login
               
                </Link>
                <Link href="/auth/signup">
             
                    Sign up
           
                </Link>
                <div
                  onClick={() => reservationServiceStore.setIspopup(true)}
                >
                  Book Now
                </div>
                <MainMenu />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};
