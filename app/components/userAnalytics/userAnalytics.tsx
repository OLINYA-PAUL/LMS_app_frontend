"use client";

import { styles } from "@/app/styles/style";
import { useGetUserAnalysisQuery } from "@/radux/features/analysis/analysisApi";
import React from "react";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from "recharts";

interface isDashBoardprops {
  isDashBoard?: boolean;
}

const UserAnalytics = ({ isDashBoard }: isDashBoardprops) => {
  const { data, isLoading } = useGetUserAnalysisQuery({});

  const analysisData: any = [];

  console.log("data user", data);

  data &&
    data?.userAanalysis?.last12Months?.forEach((v: any) => {
      analysisData.push({
        name: v.month,
        count: v.count,
      });
    });

  // Fallback data in case API data is empty
  const fallbackData = [
    { name: "Jan", count: 10 },
    { name: "Feb", count: 15 },
    { name: "Mar", count: 8 },
    { name: "Apr", count: 12 },
    { name: "May", count: 18 },
    { name: "Jun", count: 22 },
  ];

  // Use fallback data if API data is empty
  const chartData = analysisData.length > 0 ? analysisData : fallbackData;

  const minValue = 0;

  // Custom gradient for the area
  const BlueToLightPurple = () => {
    return (
      <linearGradient id="blueToLightPurple" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#4158D0" stopOpacity={0.8} />
        <stop offset="95%" stopColor="#C850C0" stopOpacity={0.2} />
      </linearGradient>
    );
  };

  // Custom tooltip component
  const CustomTooltip = (props: any) => {
    const { active, payload, label } = props;

    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 shadow-md rounded-md">
          <p className="font-semibold">{`${label}`}</p>
          <p className="text-blue-600">{`Users: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={` ${!isDashBoard ? "mt-10" : ""} w-full m-auto mt-4 pb-5`}>
      {isLoading ? (
        <div className="flex items-center justify-center w-full h-screen">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white mr-2" />
        </div>
      ) : (
        <div className="w-full">
          <div className="mt-[50px]">
            <h1
              className={`${styles.title} ${
                isDashBoard ? "text-[20px]" : ""
              }  px-5 !text-start`}
            >
              User Analytics
            </h1>
            {!isDashBoard ? (
              <p className={`${styles.lable} px-5 !text-left`}>
                Last 12 months analytics data
              </p>
            ) : null}

            <div className="w-full h-[500px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="80%">
                <AreaChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <defs>
                    <BlueToLightPurple />
                  </defs>
                  <XAxis dataKey="name">
                    <Label offset={0} position="insideBottom" />
                  </XAxis>
                  <YAxis domain={[minValue, "auto"]} />
                  <Tooltip content={CustomTooltip} />
                  <Legend />
                  <Area
                    type="monotone"
                    name="User Count"
                    dataKey="count"
                    stroke="#4158D0"
                    fillOpacity={1}
                    fill="url(#blueToLightPurple)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAnalytics;
