type ResponseData = {
  data: any[];
};

export async function GET() {
  const data: ResponseData = {
    data: [
      { id: 1, client_id: "1edas12", status_online: true, status_switch: false, name: "Device 1" },
      { id: 2, client_id: "2edas12", status_online: true, status_switch: false, name: "Device 2" },
      { id: 3, client_id: "3edas12", status_online: true, status_switch: false, name: "Device 3" },
      { id: 4, client_id: "4edas12", status_online: true, status_switch: false, name: "Device 4" },
      { id: 5, client_id: "5edas12", status_online: true, status_switch: false, name: "Device 5" },
      { id: 6, client_id: "6edas12", status_online: true, status_switch: false, name: "Device 6" },
      { id: 7, client_id: "7edas12", status_online: true, status_switch: false, name: "Device 7" },
      { id: 8, client_id: "8edas12", status_online: true, status_switch: false, name: "Device 8" },
      { id: 9, client_id: "9edas12", status_online: true, status_switch: false, name: "Device 9" },
      { id: 10, client_id: "10edas12", status_online: true, status_switch: false, name: "Device 10" },
      { id: 11, client_id: "11edas12", status_online: true, status_switch: false, name: "Device 11" },
      { id: 12, client_id: "12edas12", status_online: true, status_switch: false, name: "Device 12" },
      { id: 13, client_id: "13edas12", status_online: true, status_switch: false, name: "Device 13" },
      { id: 14, client_id: "14edas12", status_online: true, status_switch: false, name: "Device 14" },
      { id: 15, client_id: "15edas12", status_online: true, status_switch: false, name: "Device 15" },
    ],
  };

  return Response.json(data, { status: 200 });
}
