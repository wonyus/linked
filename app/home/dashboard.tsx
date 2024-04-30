import React from "react";
import InnerBox, { GroupDashboard } from "../components/Dashboard/GroupDashboard";
import {useGetAllDashboardQuery} from "../redux/services/dashboard"
import ReduxWrapper from "@Redux/Provider";

export interface IDashboardResponse {
  message: string,
  result: GroupDashboard
}

const Dashboard = () => {
    const { data, error, isLoading, isFetching, isSuccess, refetch } = useGetAllDashboardQuery(undefined, { pollingInterval: 15000 });
    const { message, result } = data || {}; // Add type guard to check if data is defined
  return (
    <div className="box-container">
      <h1>burhan</h1>
      <InnerBox online={result?.online} offline={result?.offline} active={result?.active} inactive={result?.inactive} />
          </div>
  );
};

const Wrapped = () => ReduxWrapper({ Component: Dashboard });
export default Wrapped;
