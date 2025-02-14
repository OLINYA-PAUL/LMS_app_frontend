import React, { Children } from "react";
import userAuth from "./userAuth";
import { redirect } from "next/navigation";

interface UseProtectedProps {
  children: React.ReactElement | React.ReactNode;
}

export const UserProtected = ({ children }: UseProtectedProps) => {
  const isAuthenticated = userAuth();
  return isAuthenticated ? children : redirect("/");
};
