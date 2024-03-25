"use client";
import GroupSwitch from "@Components/GroupSwitch";
import { IBasicSwitchCommit, IDevice } from "@Interface/Devices/Switch/BasicSwitch";
import { defaultPublishMessage } from "@Interface/Mesages/Message";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import ReduxWrapper from "@Redux/Provider";
import { useGetAllDevicesQuery, usePublishMutation, useUpdateDeviceMutation } from "@Redux/services/devices";
import { stringifyPublishMessage } from "@Utils/FormatPublishMessage";

import AddDevice from "./AddDevice";

const Devices = () => {
  const { data, error, isLoading, isFetching, isSuccess } = useGetAllDevicesQuery(undefined, { pollingInterval: 15000 });
  const { message, result } = data || {}; // Add type guard to check if data is defined
  const [updateDevice, updateDeviceResult] = useUpdateDeviceMutation(); // Use the dispatch function from the store
  const [publish, publishResult] = usePublishMutation();

  const buildPublishPayload = (switchId: number, checked: boolean) => {
    return {
      id: switchId,
      status: checked,
    };
  };

  const handleSwitchChange = async (clientId: string, switchId: number, checked: boolean) => {
    const payload = buildPublishPayload(switchId, checked);

    await publish(
      stringifyPublishMessage({
        ...defaultPublishMessage,
        topic: `/command/${clientId}/switch`,
        payload: [payload],
      })
    );
  };

  const handleUpdateDevice = async (device: IDevice) => {
    await updateDevice(device);
  };

  return (
    <>
      <Grid container rowSpacing={2} columnSpacing={2}>
        <Grid item xs={12} sx={{ display: "flex", flexDirection: "row-reverse" }}>
          <AddDevice />
        </Grid>
        {isLoading && (
          <Grid item component={Box} xs={12} sx={{ display: "flex", justifyContent: "space-around" }}>
            <CircularProgress />
          </Grid>
        )}
        {isSuccess &&
          result?.map((device) => {
            return (
              <Grid item key={device.id}>
                <GroupSwitch key={device.id} data={device} onSwitchChange={handleSwitchChange} onUpdate={handleUpdateDevice} />
              </Grid>
            );
          })}
      </Grid>
    </>
  );
};

const Wrapped = () => ReduxWrapper({ Component: Devices });
export default Wrapped;
