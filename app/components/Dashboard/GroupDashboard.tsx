import { TSchedulerInitialValues } from "@Components/Scheduler";
import Grid from "@mui/material/Grid";
import React from "react";
import { isMobile } from "react-device-detect";

import CardDashboard from "./CardDashboard";

interface DeviceData {
  id: number;
  client_id: number;
  mqtt_client_id: string;
  uuid: string;
  name: string;
  status: boolean;
  scheduler_active: boolean;
  scheduler: TSchedulerInitialValues;
}
interface Online {
  data: DeviceData[];
  count: number;
}
interface Offline {
  data: DeviceData[];
  count: number;
}
interface Active {
  data: DeviceData[];
  count: number;
}
interface Inactive {
  data: DeviceData[];
  count: number;
}
export interface IGroupDashboard {
  online?: Online;
  offline?: Offline;
  active?: Active;
  inactive?: Inactive;
  isLoading: boolean;
}

const GroupDashboard = ({ online, offline, active, inactive, isLoading }: IGroupDashboard) => {
  return (
    <Grid container spacing={2} justifyContent={"center"} sx={{ paddingLeft: isMobile ? 0 : 5, paddingRight: isMobile ? 0 : 5 }}>
      <Grid item lg={isMobile ? 12 : 6} sm={isMobile ? 12 : 12} xs={isMobile ? 12 : 12}>
        <CardDashboard count={online?.count} text={"online"} isLoading={isLoading} />
      </Grid>
      <Grid item lg={isMobile ? 12 : 6} sm={isMobile ? 12 : 12} xs={isMobile ? 12 : 12}>
        <CardDashboard count={offline?.count} text={"offline"} isLoading={isLoading} />
      </Grid>
      <Grid item lg={isMobile ? 12 : 6} sm={isMobile ? 12 : 12} xs={isMobile ? 12 : 12}>
        <CardDashboard count={active?.count} text={"active"} isLoading={isLoading} />
      </Grid>
      <Grid item lg={isMobile ? 12 : 6} sm={isMobile ? 12 : 12} xs={isMobile ? 12 : 12}>
        <CardDashboard count={inactive?.count} text={"inactive"} isLoading={isLoading} />
      </Grid>
    </Grid>
  );
};

export default GroupDashboard;
