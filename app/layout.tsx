"use client";

import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import { Josefin_Sans } from "next/font/google";
import { ThemeProviders } from "@/utils/theme-provider";
import { Toaster } from "react-hot-toast";
import { RaduxProviders } from "@/providers/raduxProvider";
import { SessionProvider } from "next-auth/react";
import { useLoadUserQuery } from "@/radux/features/api/apiSlice";
import { ImSpinner } from "react-icons/im";
import React from "react";
const metadata: Metadata = {
  title: "React Prodigy | Learn Anytime, Anywhere with Expert-Led Courses",
  description:
    "Empower your learning journey with React Prodigy, the ultimate platform for online education. Explore interactive courses, track progress, and achieve your goals anytime, anywhere. Join a thriving community of learners and unlock your potential today",
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Poppins",
});

const Josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Josefin",
});

const RootLayout = ({
  children,
  session,
}: Readonly<{
  children: React.ReactNode;
  session?: null;
}>) => {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${Josefin.variable} antialiased bg-no-repeat bg-white container`}
      >
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

const CustomeLoader = ({
  children,
}: {
  children: React.ReactElement | React.ReactNode;
}) => {
  const { isLoading, data } = useLoadUserQuery({});
  console.log({ data });

  return (
    <div className="w-full overflow-hidden ">
      {isLoading ? (
        <div className="flex items-center justify-center w-full h-screen">
          <ImSpinner className="w-7 h-7 text-black dark:text-green-400 " />
        </div>
      ) : (
        <div>{children}</div>
      )}
    </div>
  );
};
