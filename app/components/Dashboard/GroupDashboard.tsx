import React from "react";
import SmallSquare from "./SmallSquare";
import { TSchedulerInitialValues } from "@Components/Scheduler";

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
export interface GroupDashboard {
  online?: Online;
  offline?: Offline;
  active?: Active;
  inactive?: Inactive;
}

const InnerBox = ({online,offline,active,inactive}:GroupDashboard) => {
  console.log(online?.count,offline?.count,active?.count,inactive?.count);
  
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <div style={{ display: "flex", gap: "10px" }}>
        <SmallSquare count={online?.count} text={"online"}/>
        <SmallSquare count={offline?.count} text={"offline"}/>
        <SmallSquare count={active?.count} text={"active"}/>
        <SmallSquare count={inactive?.count} text={"inactive"}/>
      </div>
    </div>
  );
};

export default InnerBox;
