import UserAnalysis from "@/app/components/admin/users/user-analysis";
import React from "react";

const page = () => {
  return (
    <div className="w-full">
      <UserAnalysis team={true} />
    </div>
  );
};

export default page;
