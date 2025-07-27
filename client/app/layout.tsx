"use client";
import {
  useLoadUserQuery,
  useRefreshTokenQuery,
} from "@/redux/features/api/apiSlice";
import "./globals.css";
import { Loader } from "./components";
import { Toaster } from "react-hot-toast";
import { Poppins } from "next/font/google";
import React, { FC, useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";
import { ReduxProvider } from "./providers/ReduxProvider";
import { ThemeProvider } from "./providers/ThemeProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Poppins",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} !bg-white bg-no-repeat dark:bg-gradient-to-b dark:from-gray-900 dark:to-black duration-300`}
      >
        <ReduxProvider>
          <SessionProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <Custom>{children}</Custom>
              <Toaster position="top-center" reverseOrder={false} />
            </ThemeProvider>
          </SessionProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}

const Custom: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoading: isUserLoading } = useLoadUserQuery({});
  const { isLoading: isRefreshLoading } = useRefreshTokenQuery({});

  const isLoading = isUserLoading || isRefreshLoading;
  return <>{isLoading ? <Loader /> : <div>{children}</div>}</>;
};
