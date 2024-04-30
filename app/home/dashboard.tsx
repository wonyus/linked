import ReduxWrapper from "@Redux/Provider";
import React from "react";

import GroupDashboard, { IGroupDashboard } from "../components/Dashboard/GroupDashboard";
import { useGetAllDashboardQuery } from "../redux/services/dashboard";

export interface IDashboardResponse {
  message: string;
  result: IGroupDashboard;
}

const Dashboard = () => {
  const { data, error, isLoading, isFetching, isSuccess, refetch } = useGetAllDashboardQuery(undefined, { pollingInterval: 15000 });
  const { message, result } = data || {}; // Add type guard to check if data is defined
  return (
    <GroupDashboard online={result?.online} offline={result?.offline} active={result?.active} inactive={result?.inactive} isLoading={isLoading} />
  );
};

const Wrapped = () => ReduxWrapper({ Component: Dashboard });
export default Wrapped;
