"use client";

import "./globals.css";
import { ThemeProviders } from "@/utils/theme-provider";
import { Toaster } from "react-hot-toast";
import { RaduxProviders } from "@/providers/raduxProvider";
import { SessionProvider } from "next-auth/react";
import React from "react";
import CustomeLoader from "./components/customeLoader/loader";
import { fontsStyles } from "./ServerLayout";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={fontsStyles}>
        <RaduxProviders>
          <SessionProvider>
            <ThemeProviders
              attribute="class"
              defaultTheme="system"
              enableSystem
            >
              <CustomeLoader>{children}</CustomeLoader>
              <Toaster />
            </ThemeProviders>
          </SessionProvider>
        </RaduxProviders>
      </body>
    </html>
  );
};

export default RootLayout;
