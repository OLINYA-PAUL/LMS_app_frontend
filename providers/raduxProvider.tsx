"use client";

import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { storeConfigs } from "../radux/store";

export const RaduxProviders = ({
  children,
}: {
  children: React.ReactElement | React.ReactNode;
}): React.ReactElement | React.ReactNode => {
  return <Provider store={storeConfigs}>{children}</Provider>;
};
