"use client";

import DashboardHeaders from "@/app/admin/dashboardHeaders";
import React from "react";

const DashBoardHero = ({ isDashBoard }: { isDashBoard?: boolean }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="w-full  ">
      <DashboardHeaders open={open} setOpen={setOpen} />
    </div>
  );
};

export default DashBoardHero;
