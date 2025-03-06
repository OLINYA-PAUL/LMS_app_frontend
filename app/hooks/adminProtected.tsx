"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

interface AdminProtectedProps {
  children: React.ReactElement | React.ReactNode;
}

export const AdminProtected = ({ children }: AdminProtectedProps) => {
  const { user } = useSelector((state: any) => state.auth);
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    if (!user) {
      setIsAuthorized(false);
      router.push("/"); // Redirect if no user
      return;
    }

    if (user?.role !== "admin") {
      toast.error("You are not authorised to see this page");
      setIsAuthorized(false);
      router.push("/");
      return;
    }

    setIsAuthorized(true);
  }, [user, router]);

  if (isAuthorized === null) {
    return <p>Loading...</p>; // Prevent blank screen
  }

  return isAuthorized ? children : router.push("/");
};
