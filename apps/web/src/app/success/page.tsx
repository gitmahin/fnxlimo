"use client";
import { Button } from "@fnx/ui";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

export default function Page() {
  const params = useSearchParams();
  const router = useRouter();
  const order_id = params.get("order");
  return (
    <div className="w-full flex justify-center items-center mt-24 ">
      <p className="text-center w-full mt-5 mb-10">
        Reservation created success
      </p>
      <Button onClick={() => router.push("/dashboard")}>
        Return to dashboard
      </Button>
    </div>
  );
}
