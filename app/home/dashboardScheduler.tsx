import ReduxWrapper from "@Redux/Provider";
import React from "react";


import GroupDashboardScheduler from "../components/DashboardScheduler/GroupDashboardScheduler";
import  {useGetAllDashboardSchedulerQuery}  from "../redux/services/dashboardScheduler";

const DashboardScheduler = () => {
  const { data, error, isLoading, isFetching, isSuccess, refetch } = useGetAllDashboardSchedulerQuery(undefined, { pollingInterval: 15000 });
  const { onlineSchedul, offlineSchedul, completed } = data || {}; // Add type guard to check if data is defined
  return (
    <><h1>DashboardScheduler</h1>
    <GroupDashboardScheduler working={onlineSchedul} offlineSchedul={offlineSchedul} completed={completed} isLoading={isLoading} /></>
  );
}

const Wrapped = () => ReduxWrapper({ Component: DashboardScheduler });
export default Wrapped;