
export interface SwitchData {
  client_id: string;
  switch_id: number;
  status: boolean;
  name: string;
  mqtt_client_id: string;
}

export interface Device {
  id: number;
  client_id: string;
  status_online: boolean;
  data: SwitchData[];
  name: string;
}

export interface IBasicSwitchCommit {
  status: Boolean;
  id: number;
}
