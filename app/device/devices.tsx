"use client";
import GroupSwitch from "@Components/GroupSwitch";
import { IBasicSwitchCommit, IDevice } from "@Interface/Devices/Switch/BasicSwitch";
import { defaultPublishMessage } from "@Interface/Mesages/Message";
import { Box, Button, CircularProgress, Grid } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@Redux/hooks";
import ReduxWrapper from "@Redux/Provider";
import { getAllDevices, updateSwitch, updateSwitchDevice } from "@Redux/reducers/deviceSlice";
import { useGetAllDevicesQuery, usePublishMutation, useUpdateDeviceMutation } from "@Redux/services/devices";
import { stringifyPublishMessage } from "@Utils/FormatPublishMessage";
import { useEffect } from "react";

import AddDevice from "./AddDevice";

const Devices = () => {
  const { data, error, isLoading, isFetching, isSuccess } = useGetAllDevicesQuery(undefined, { pollingInterval: 15000 });
  const { message, result } = data || {}; // Add type guard to check if data is defined
  const [updateDevice, updateDeviceResult] = useUpdateDeviceMutation(); // Use the dispatch function from the store
  const [publish, publishResult] = usePublishMutation();

  const handleSwitchChange = async (clientId: string, switchId: number, checked: boolean) => {
    const data = defaultPublishMessage;
    data.topic = "/command/" + clientId + "/switch";
    const payload: IBasicSwitchCommit = { id: switchId, status: checked };
    data.payload = [payload];
    await publish(stringifyPublishMessage(data));
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
