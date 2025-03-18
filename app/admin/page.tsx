"use client";

import { useState } from "react";
import DashBoardeWidget from "../components/widget/DashBoardeWidget";

const page = ({ isDashBoard }: { isDashBoard: boolean }) => {
  const [open, setOpen] = useState(false);

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
