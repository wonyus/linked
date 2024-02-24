import { PublishMessage } from "@Interface/Mesages/Message";

export function stringifyPublishMessage(data: PublishMessage): PublishMessage {
  data.payload = JSON.stringify(data.payload);
  return data;
}
