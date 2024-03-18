"use client";
import GroupSwitch from "@Components/GroupSwitch";
import { IBasicSwitchCommit, IDevice } from "@Interface/Devices/Switch/BasicSwitch";
import { defaultPublishMessage } from "@Interface/Mesages/Message";
import { Box, Button, CircularProgress, Grid } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@Redux/hooks";
import ReduxWrapper from "@Redux/Provider";
import { getAllDevices, updateSwitch, updateSwitchDevice } from "@Redux/reducers/deviceSlice";
import { stringifyPublishMessage } from "@Utils/FormatPublishMessage";
import { useEffect } from "react";

const Devices = () => {
  const devicesData = useAppSelector((state) => state.devices);
  const dispatch = useAppDispatch();
  const data = devicesData.devices;

  const getData = () => {
    dispatch(getAllDevices());
  };

  useEffect(() => {
    getData(); // Call once when component mounts
    const intervalId = setInterval(getData, 15000); // Dispatch every 15 seconds
    return () => clearInterval(intervalId); // Cleanup on unmount

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSwitchChange = (clientId: string, switchId: number, checked: boolean) => {
    const data = defaultPublishMessage;
    data.topic = "/command/" + clientId + "/switch";
    const payload: IBasicSwitchCommit = { id: switchId, status: checked };
    data.payload = [payload];
    dispatch(updateSwitch(stringifyPublishMessage(data)));
  };

  const handleUpdateDevice = async (device: IDevice) => {
    await dispatch(updateSwitchDevice(device))
      .unwrap()
      .then((res) => {
        if (res.message === "success") {
          getData();
        }
      });
  };
  return (
    <>
      <Grid container rowSpacing={2} columnSpacing={2}>
        {devicesData.status === "loading" && data.length === 0 && (
          <Grid item component={Box} xs={12} sx={{ display: "flex", justifyContent: "space-around" }}>
            <CircularProgress />
          </Grid>
        )}
        {data.length > 0 &&
          data?.map((device) => {
            return (
              <Grid item key={device.id}>
                <GroupSwitch key={device.id} data={device} onSwitchChange={handleSwitchChange} onUpdate={handleUpdateDevice} />
              </Grid>
            );
          })}
      </Grid>
      <Button variant="contained" onClick={getData}>
        Refresh
      </Button>
    </>
  );
};

const Wrapped = () => ReduxWrapper({ Component: Devices });
export default Wrapped;
