"use client";
import { apolloClient } from "@/lib";
import { ApolloProvider } from "@apollo/client";
import React from "react";

export const ApolloClientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};
