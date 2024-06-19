import Grid from "@mui/material/Grid";
import React from "react";
import { isMobile } from "react-device-detect";

import CardDashboardScheduler from "./CardDashboardScheduler";

interface DeviceDataSchedul {
    id: number;
    client_id: number;
    name: string;
    status: boolean;
    scheduler_active: boolean;
    started: string;
    }
interface OnlineSchedul {
    data: DeviceDataSchedul[];
    count: number;
}
interface OfflineSchedul {
    data: DeviceDataSchedul[];
    count: number;
}
interface Completed {
    data: DeviceDataSchedul[];
    count: number;
}

export interface IGroupDashboardSchedul {
    working?: OnlineSchedul;
    offlineSchedul?: OfflineSchedul;
    completed?: Completed;
    isLoading: boolean;
}

const GroupDashboardSchedul = ({ working, offlineSchedul, completed, isLoading }: IGroupDashboardSchedul) => {
    return(
    <Grid container spacing={2} justifyContent={"center"} sx={{ paddingLeft: isMobile ? 0 : 5, paddingRight: isMobile ? 0 : 5 }}>
        <Grid item lg={isMobile ? 12 : 6} sm={isMobile ? 12 : 12} xs={isMobile ? 12 : 12}>
            <CardDashboardScheduler count={working?.count} text={"Pending"} isLoading={isLoading} />
        </Grid>
        <Grid item lg={isMobile ? 12 : 6} sm={isMobile ? 12 : 12} xs={isMobile ? 12 : 12}>
            <CardDashboardScheduler count={offlineSchedul?.count} text={"Next Scheduler"} isLoading={isLoading} />
        </Grid>
        <Grid item lg={isMobile ? 12 : 6} sm={isMobile ? 12 : 12} xs={isMobile ? 12 : 12}>
            <CardDashboardScheduler count={completed?.count} text={"Completed"} isLoading={isLoading} />
        </Grid>
    </Grid>
    );
};

export default GroupDashboardSchedul;