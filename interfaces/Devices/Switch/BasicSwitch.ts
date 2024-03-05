import { TSchedulerInitialValues } from "@Components/Scheduler";

export interface ISwitchData {
  client_id: string;
  switch_id: number;
  status: boolean;
  name: string;
  mqtt_client_id: string;
  scheduler: TSchedulerInitialValues;
}

export interface IDevice {
  id: number;
  client_id: string;
  name: string;
  status_online: boolean;
  data: ISwitchData[];
}

export interface IBasicSwitchCommit {
  status: Boolean;
  id: number;
}
