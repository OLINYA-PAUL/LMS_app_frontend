import AllInvoice from "@/app/components/allInvoice/AllInvoice";
import React from "react";

const Invoices = () => {
  return (
    <div className="w-full">
      <AllInvoice isDashBoard={false} />
    </div>
  );
};

export default Invoices;
