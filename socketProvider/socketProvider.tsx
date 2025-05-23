"use client";

import { useEffect, ReactNode } from "react";
import { io } from "socket.io-client";

const SOCKET_URL =
  process.env.NEXT_PUBLIC_SOCKET_URL ||
  "https://elearning-app-f00t.onrender.com";

export const socket = io(SOCKET_URL, {
  transports: ["websocket"],
});

export default function SocketProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Listen to the correct client-side event
    socket.on("connect", () => {});

    return () => {
      socket.off("connect");
    };
  }, []);

  return <div className="w-full">{children}</div>;
}
