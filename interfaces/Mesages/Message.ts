export interface PublishMessage {
  payload_encoding: string;
  topic: string;
  qos: number;
  payload: any;
  retain: boolean;
}

export const defaultPublishMessage: PublishMessage = {
  payload_encoding: "plain",
  topic: "topic",
  qos: 0,
  payload: "",
  retain: false,
};
