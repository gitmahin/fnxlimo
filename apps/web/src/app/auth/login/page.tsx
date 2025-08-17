"use client";
import { GalleryVerticalEnd } from "lucide-react";

import { LoginForm } from "@/components/auth/login-form";
import Link from "next/link";
import Image from "next/image";
import { checkServerhealth } from "@/actions/server.actions";

export default function LoginPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 self-center font-medium"
        >
          <Image
            src={"/fnx_logo.png"}
            width={500}
            height={300}
            className="h-[35px] object-contain w-fit"
            alt="app-logo"
          />
        </Link>
        <LoginForm />
      </div>
    </div>
  );
}
