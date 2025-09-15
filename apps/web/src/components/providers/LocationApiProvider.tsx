"use client";
import React from "react";
import { APIProvider } from "@vis.gl/react-google-maps";

export function LocationApiProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <APIProvider
      libraries={["places"]}
      apiKey={"AIzaSyDwMV5D6dqD2QW92kglQEXYDnSWMtaArDM"}
    >
      {children}
    </APIProvider>
  );
}
