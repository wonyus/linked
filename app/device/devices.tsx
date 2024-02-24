"use client";
import GroupSwitch from "@Components/GroupSwitch";
import { IBasicSwitchCommit } from "@Interface/Devices/Switch/BasicSwitch";
import { defaultPublishMessage } from "@Interface/Mesages/Message";
import { Button, Grid } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@Redux/hooks";
import ReduxWrapper from "@Redux/Provider";
import { getAllDevices, updateDevice } from "@Redux/reducers/deviceSlice";
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

  const handleChange = (clientId: string, switchId: number, checked: boolean) => {
    const data = defaultPublishMessage;
    data.topic = "/command/" + clientId + "/switch";
    const payload: IBasicSwitchCommit = { id: switchId, status: checked };
    data.payload = [payload];
    dispatch(updateDevice(stringifyPublishMessage(data)));
  };

  return (
    <>
      <Grid container rowSpacing={2} columnSpacing={2}>
        {data &&
          data?.map((device) => {
            return (
              <Grid item key={device.id}>
                <GroupSwitch key={device.id} data={device} handleChange={handleChange} />
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
