import axiosInstance from "@App/http/axios";

type ResponseData = {
  message: string;
  result: any[];
};

export async function GET() {

  const data: ResponseData = {
    message: "success",
    result: [
      {
        id: 10,
        client_id: "test",
        name: "mqttxswitch",
        status_online: true,
        data: [
          {
            client_id: "test",
            switch_id: 8,
            status: false,
            name: "switch",
            mqtt_client_id: "mqttx",
          },
        ],
      },
      {
        id: 11,
        client_id: "mqttx",
        name: "mqttxswitch1",
        status_online: true,
        data: [
          {
            client_id: "mqttx",
            switch_id: 1,
            status: false,
            name: "switch",
            mqtt_client_id: "mqttx",
          },
          {
            client_id: "mqttx",
            switch_id: 2,
            status: true,
            name: "switch",
            mqtt_client_id: "mqttx",
          },
        ],
      },
      {
        id: 12,
        client_id: "mqttx1",
        name: "mqttx1switch",
        status_online: true,
        data: [
          {
            client_id: "mqttx1",
            switch_id: 3,
            status: false,
            name: "switch",
            mqtt_client_id: "mqttx1",
          },
          {
            client_id: "mqttx1",
            switch_id: 4,
            status: false,
            name: "switch",
            mqtt_client_id: "mqttx1",
          },
          {
            client_id: "mqttx1",
            switch_id: 5,
            status: false,
            name: "switch",
            mqtt_client_id: "mqttx1",
          },
          {
            client_id: "mqttx1",
            switch_id: 6,
            status: false,
            name: "switch",
            mqtt_client_id: "mqttx1",
          },
          {
            client_id: "mqttx1",
            switch_id: 7,
            status: false,
            name: "switch",
            mqtt_client_id: "mqttx1",
          },
        ],
      },
    ],
  };

  return Response.json(data, { status: 200 });
}
