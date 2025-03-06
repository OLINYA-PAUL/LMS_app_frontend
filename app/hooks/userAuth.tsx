"use client";

import { useSelector } from "react-redux";

const useUserAuth = () => {
  const user = useSelector((state: any) => state.auth?.user);
  return !!user;
};

export default useUserAuth;
