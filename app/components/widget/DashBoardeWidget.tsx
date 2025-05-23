"use client";

import React, { use, useEffect } from "react";
import UserAnalytics from "../userAnalytics/userAnalytics";
import { PiUsersFourLight } from "react-icons/pi";
import OrderAnalytics from "../orderAnalytics/orderAnalytics";
import AllInvoice from "../allInvoice/AllInvoice";
import { useGetOrderAnalysisQuery } from "@/radux/features/analysis/analysisApi";
import { useGetUserAnalysisQuery } from "@/radux/features/analysis/analysisApi";

// Define CircularProgressWithLabel component
const CircularProgressWithLabel = ({
  value,
  open,
}: {
  value: number;
  open: boolean;
}) => {
  return (
    <div className="relative h-20 w-20">
      <svg className="h-full w-full" viewBox="0 0 100 100">
        <circle
          className="stroke-gray-300 dark:stroke-gray-600 fill-none"
          cx="50"
          cy="50"
          r="40"
          strokeWidth="6"
        />
        <circle
          cx="50"
          cy="50"
          r="40"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={`${value * 2.51} 251`}
          transform="rotate(-90 50 50)"
          className={`${
            value && value < 99
              ? "stroke-[#ff2600] fill-none"
              : "stroke-[#45CBA0] fill-none"
          } transition-all duration-300 ease-in-out`}
        />
        <text
          x="50"
          y="55"
          className="fill-black dark:fill-white text-xl font-semibold"
          textAnchor="middle"
        >
          {value}%
        </text>
      </svg>
    </div>
  );
};

const DashBoardeWidget = ({
  open,
  setOpen,
  isDashBoard = false,
  value = 0,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isDashBoard?: boolean;
  value?: number;
}) => {
  const [compareUserPercentage, setcompareUserPercentage] = React.useState<any>(
    {}
  );
  const [compareOrderPercentage, setcompareOrderPercentage] =
    React.useState<any>({});
  const { data: userData, isLoading: userAnaLoading } = useGetUserAnalysisQuery(
    {}
  );
  const { data: orderData, isLoading } = useGetOrderAnalysisQuery({});
  // console.log("user data", userData);
  // console.log("order data", orderData);

  const userAndSalesPercentageChange = async () => {
    try {
      if (userData && orderData) {
        const userLastTwoMonths =
          await userData?.userAanalysis?.last12Months.slice(-2);
        const orderLastTwoMonths =
          await orderData?.oderAanalysis?.last12Months.slice(-2);

        if (userLastTwoMonths.length === 2 && orderLastTwoMonths.length === 2) {
          const useCurrentMonth = userLastTwoMonths[1].count;
          const userPreviousMonth = userLastTwoMonths[0].count;
          const orderCurrentMonth = orderLastTwoMonths[1].count;
          const orderPreviousMonth = orderLastTwoMonths[0].count;

          const userPercentChange =
            userPreviousMonth !== 0
              ? ((useCurrentMonth - userPreviousMonth) / userPreviousMonth) *
                100
              : 100;

          const orderPercentChange =
            orderPreviousMonth !== 0
              ? ((orderCurrentMonth - orderPreviousMonth) /
                  orderPreviousMonth) *
                100
              : 100;

          console.log("userLastTwoMonths >>>>>>>>>>>>>>>>>", userLastTwoMonths);

          console.log(
            "orderLastTwoMonths >>>>>>>>>>>>>>>>>",
            orderLastTwoMonths
          );

          setcompareUserPercentage({
            currentMonth: useCurrentMonth,
            previousMonth: userPreviousMonth,
            percentageChange: Math.round(userPercentChange),
          });

          setcompareOrderPercentage({
            currentMonth: orderCurrentMonth,
            previousMonth: orderPreviousMonth,
            percentageChange: Math.round(orderPercentChange),
          });
        }
      }
    } catch (err: any) {
      console.log(err);
    }
  };
  // userAndSalesPercentageChange();

  useEffect(() => {
    if (userData && orderData) {
      userAndSalesPercentageChange();
    }
  }, [userData, orderData]);

  if (userAnaLoading || isLoading) return "Loading percentage Data...";

  console.log("compareUserPercentage", compareUserPercentage);
  console.log("compareOrderPercentage", compareOrderPercentage);

  return (
    <div className="w-full">
      <div className="mt-6">
        {/* Main grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[70%,30%] md:grid-cols-[65%,35%] gap-5 md:gap-6">
          {/* Left column - UserAnalytics */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
            <UserAnalytics isDashBoard={true} />
          </div>

          {/* Right column - Widgets with auto height */}
          <div className="flex flex-col md:flex-row lg:flex-col gap-5 h-auto">
            {/* Sales Widget */}
            <div className=" bg-white dark:bg-gray-900 rounded-xl shadow-md p-5 transition-all duration-300 hover:shadow-lg">
              <div className="flex justify-between items-center">
                <div className="space-y-3">
                  <div className="flex items-center">
                    <PiUsersFourLight className="dark:text-[#45CBA0] text-[#000] text-4xl mr-3" />
                    <h5 className="font-Poppins dark:text-[#fff] text-black text-2xl font-semibold">
                      {compareOrderPercentage &&
                        compareOrderPercentage?.currentMonth}
                    </h5>
                  </div>
                  <h5 className="font-Poppins dark:text-[#45CBA0] text-black text-sm font-medium tracking-wide uppercase">
                    Sales
                  </h5>
                </div>
                <div className="flex flex-col items-center">
                  <CircularProgressWithLabel
                    value={compareOrderPercentage.percentage > 0 ? 100 : 0}
                    open={open}
                  />
                  <h5 className="text-center dark:text-white text-black font-medium mt-2 text-sm">
                    {isFinite(compareOrderPercentage?.percentageChange)
                      ? `${
                          compareOrderPercentage.percentageChange >= 0
                            ? "+"
                            : ""
                        }${compareOrderPercentage.percentageChange}%`
                      : "0%"}
                  </h5>
                </div>
              </div>
            </div>

            {/* New Users Widget */}
            <div className=" bg-white dark:bg-gray-900 rounded-xl shadow-md p-5 transition-all duration-300 hover:shadow-lg">
              <div className="flex justify-between items-center">
                <div className="space-y-3">
                  <div className="flex items-center">
                    <PiUsersFourLight className="dark:text-[#45CBA0] text-[#000] text-4xl mr-3" />
                    <h5 className="font-Poppins dark:text-[#fff] text-black text-2xl font-semibold">
                      {compareUserPercentage &&
                        compareUserPercentage?.currentMonth}
                    </h5>
                  </div>
                  <h5 className="font-Poppins dark:text-[#45CBA0] text-black text-sm font-medium tracking-wide uppercase">
                    New Users
                  </h5>
                </div>
                <div className="flex flex-col items-center">
                  <CircularProgressWithLabel
                    value={compareUserPercentage.percentage > 0 ? 100 : 0}
                    open={open}
                  />
                  <h5 className="text-center dark:text-white text-black font-medium mt-2 text-sm">
                    {/* {compareUserPercentage &&
                    compareUserPercentage?.percentageChange >= 0
                      ? "+" +
                          String(compareUserPercentage?.percentageChange) ===
                          "Infinity" && 0
                      : "-" +
                          String(compareUserPercentage?.percentageChange) ===
                          "Infinity" && 0} */}
                  </h5>
                  <h5 className="text-center dark:text-white text-black font-medium mt-2 text-sm">
                    {isFinite(compareUserPercentage?.percentageChange)
                      ? `${
                          compareUserPercentage.percentageChange >= 0 ? "+" : ""
                        }${compareUserPercentage.percentageChange}%`
                      : "0%"}
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* grid grid-cols-1 lg:grid-cols-[65%,35%] gap-5 w-full mt-6 */}
      <div className=" grid grid-cols-1 lg:grid-cols-[60%,40%] gap-5 w-full mt-6">
        <div className="dark:bg-gray-900 bg-white shadow-md rounded-md w-full h-auto">
          <OrderAnalytics isDashBoard={true} />
        </div>
        <div className="w-full">
          <h5 className="dark:text-white text-black text-xl font-medium font-Poppins p-4 border-b border-gray-200 dark:border-gray-700">
            Recent Transaction
          </h5>
          <div className=" max-sm:overflow-x-auto ">
            <AllInvoice isDashBoard={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardeWidget;
