"use client";

import { styles } from "@/app/styles/style";
import { useGetOrderAnalysisQuery } from "@/radux/features/analysis/analysisApi";
import React from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface isDashBoardprops {
  isDashBoard?: boolean;
}
const OrderAnalytics = ({ isDashBoard }: isDashBoardprops) => {
  const { data, isLoading } = useGetOrderAnalysisQuery({});

  const analysisData: any = [];

  console.log("Raw data structure:", data);
  data &&
    data?.oderAanalysis?.last12Months?.forEach((v: any) =>
      analysisData.push({
        name: v.month,
        orders: v.count,
      })
    );

  // Fallback data in case API data is empty
  const fallbackData = [
    { name: "Jan", orders: 10 },
    { name: "Feb", orders: 15 },
    { name: "Mar", orders: 8 },
    { name: "Apr", orders: 12 },
    { name: "May", orders: 18 },
    { name: "Jun", orders: 22 },
  ];

  // Use fallback data if API data is empty
  const chartData = analysisData.length > 0 ? analysisData : fallbackData;

  // Custom tooltip component
  const CustomTooltip = (props: any) => {
    const { active, payload, label } = props;

    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 shadow-md rounded-md">
          <p className="font-semibold">{`${label}`}</p>
          <p className="text-blue-600">{`Orders: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full m-auto mt-4 pb-5">
      {isLoading ? (
        <div className="flex items-center justify-center w-full h-screen">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white mr-2" />
        </div>
      ) : (
        <div className="w-full">
          <div className="mt-8">
            <h1 className={`${styles.title} px-5 !text-start`}>
              Order Analytics
            </h1>

            {!isDashBoard && (
              <p className={`${styles.lable} px-5 !text-left`}>
                Last 12 months order trends
              </p>
            )}

            <div
              className={`${
                isDashBoard ? "h-[300px]" : "h-[400px]"
              } w-full flex items-center justify-center mt-10`}
            >
              <ResponsiveContainer
                width={isDashBoard ? "100%" : "90%"}
                height={isDashBoard ? 300 : 400}
              >
                <LineChart
                  width={300}
                  height={100}
                  data={chartData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="orders"
                    stroke="#4158D0"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderAnalytics;
