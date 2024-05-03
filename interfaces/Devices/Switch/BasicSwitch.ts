import { TSchedulerInitialValues } from "@Components/Scheduler";

export interface ISwitchData {
  client_id: string;
  switch_id: number;
  status: boolean;
  name: string;
  mqtt_client_id: string;
  scheduler: TSchedulerInitialValues;
  scheduler_active: boolean;
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

export interface IDeviceResponse {
  message: string;
  result: IDevice[];
}

export interface IAddDevice {
  client_id: string;
  type: string;
  switch_amount: number;
}
