"use client";

import { useState } from "react";
import DashBoardeWidget from "../components/widget/DashBoardeWidget";

const page = () => {
  const [open, setOpen] = useState(false);

  const isDashBoard: boolean = false;

  return (
    <div className="w-full ">
      {
        <DashBoardeWidget
          open={open}
          setOpen={setOpen}
          isDashBoard={isDashBoard}
        />
      }
    </div>
  );
};

export default page;
