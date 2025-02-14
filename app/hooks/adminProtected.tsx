"use client";

import React from "react";
import { redirect } from "next/navigation";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

interface UseProtectedProps {
  children: React.ReactElement | React.ReactNode;
}

export const AdminProtected = ({ children }: UseProtectedProps) => {
  const { user } = useSelector((state: any) => state.auth);

  if (!user) return null;
  const isAdmin = user?.role === "admin";
  if (!isAdmin) toast.error("You are not authorised to see this page");

  return isAdmin ? children : redirect("/");
};
