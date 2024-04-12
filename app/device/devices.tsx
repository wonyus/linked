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
import React, { useEffect } from "react";

import AddDevice from "./AddDevice";

export interface SWLoading {
  switchId: number;
  loading: boolean;
}

const Devices = () => {
  const { data, error, isLoading, isFetching, isSuccess, refetch } = useGetAllDevicesQuery(undefined, { pollingInterval: 15000 });
  const { message, result } = data || {}; // Add type guard to check if data is defined
  const [updateDevice, updateDeviceResult] = useUpdateDeviceMutation(); // Use the dispatch function from the store
  const [publish, publishResult] = usePublishMutation();
  const [swLoading, setSwLoading] = React.useState<SWLoading>({ switchId: 0, loading: false });

  useEffect(() => {
    if (!isFetching) {
      setSwLoading((state) => {
        return { ...state, loading: false };
      });
    }
  }, [isFetching]);

  const buildPublishPayload = (switchId: number, checked: boolean) => {
    return {
      id: switchId,
      status: checked,
    };
  };

  const handleSwitchChange = async (clientId: string, switchId: number, checked: boolean) => {
    setSwLoading({ switchId, loading: true });

    const payload = buildPublishPayload(switchId, checked);
    await publish(
      stringifyPublishMessage({
        ...defaultPublishMessage,
        topic: `/command/${clientId}/switch`,
        payload: [payload],
      })
    );
    // count down 2 sec
    setTimeout(async () => {
      await refetch();
    }, 1500);
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
                <GroupSwitch key={device.id} data={device} onSwitchChange={handleSwitchChange} onUpdate={handleUpdateDevice} swloading={swLoading} />
              </Grid>
            );
          })}
      </Grid>
    </>
  );
};

const Wrapped = () => ReduxWrapper({ Component: Devices });
export default Wrapped;
