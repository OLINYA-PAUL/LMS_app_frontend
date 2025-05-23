"use client";

import "./globals.css";
import { ThemeProviders } from "@/utils/theme-provider";
import { Toaster } from "react-hot-toast";
import { RaduxProviders } from "@/providers/raduxProvider";
import { SessionProvider } from "next-auth/react";
import React from "react";
import CustomeLoader from "./components/customeLoader/loader";
import { fontsStyles } from "./ServerLayout";
// import { io } from "socket.io-client";
import SocketProvider from "../socketProvider/socketProvider";
// const SOCKET_URL =
//   process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3000";
// export const socket = io(SOCKET_URL, {
//   // autoConnect: false,
//   transports: ["websocket"],
// });

// socket.on("connection", () => {});
// import SocketProvider from "@/socketProvider/socketProvider";

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
              <SocketProvider>
                <CustomeLoader>{children}</CustomeLoader>
              </SocketProvider>
              <Toaster />
            </ThemeProviders>
          </SessionProvider>
        </RaduxProviders>
      </body>
    </html>
  );
};

export default RootLayout;
