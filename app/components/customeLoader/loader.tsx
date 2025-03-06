"use client";

import { useLoadUserQuery } from "@/radux/features/api/apiSlice";

const CustomeLoader = ({
  children,
}: {
  children: React.ReactElement | React.ReactNode;
}) => {
  const { isLoading, data } = useLoadUserQuery({});
  console.log("load user info", { data });

  return (
    <div className="w-full overflow-hidden ">
      {isLoading ? (
        <div className="flex items-center justify-center w-full h-screen">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white mr-2" />{" "}
        </div>
      ) : (
        <div>{children}</div>
      )}
    </div>
  );
};

export default CustomeLoader;
