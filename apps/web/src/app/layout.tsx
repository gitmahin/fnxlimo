import type { Metadata } from "next";
import localFont from "next/font/local";
import "@radix-ui/themes/styles.css";
import "@fnx/ui/styles/globals.css";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "./styles/home.styles.css";
import { ThemeProvider } from "next-themes";
import { Theme } from "@radix-ui/themes";
import { ReservationPopUp } from "@/components";
import SessionWrapper from "@/components/auth/session-wrapper";
import {
  ApolloClientProvider,
  LocationApiProvider,
} from "@/components/providers";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Reserve Your Best Car | Finixlimo",
  description:
    "Car Reservation Software. Made by DEB Team. Contact: https://debbd.com/contact-us",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Suspense>
          <SessionWrapper>
            <ApolloClientProvider>
              <Theme
                accentColor="purple"
                grayColor="slate"
                appearance="inherit"
                hasBackground={false}
              >
                <LocationApiProvider>
                  <ThemeProvider attribute={"class"} defaultTheme="dark">
                    <ReservationPopUp />
                    {children}
                    <Toaster
                    
          position="top-right"
          containerStyle={{ zIndex: 2147483647 }}
          toastOptions={{ style: { zIndex: 2147483647 } }}
        />
                  </ThemeProvider>
                </LocationApiProvider>
              </Theme>
            </ApolloClientProvider>
          </SessionWrapper>
        </Suspense>
      </body>
    </html>
  );
}
