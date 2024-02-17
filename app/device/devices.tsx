"use client";
import BasicSwitch from "@Switch/BasicSwitch";
import ReduxWrapper from "@Redux/Provider";
import { useAppDispatch, useAppSelector } from "@Redux/hooks";
import { Button, Grid } from "@mui/material";
import { useEffect } from "react";
import { getAllDevices, updateDevice } from "@Redux/reducers/deviceSlice";
import { IBasicSwitchCommit } from "@Interface/Devices/Switch/BasicSwitch";
import { stringifyPublishMessage } from "@Utils/FormatPublishMessage";
import { defaultPublishMessage } from "@Interface/Mesages/Message";
import GroupSwitch from "@Components/GroupSwitch";

const Devices = () => {
  const devicesData = useAppSelector((state) => state.devices);
  const dispatch = useAppDispatch();
  const data = devicesData.devices;

  const getData = () => {
    dispatch(getAllDevices());
  };

  useEffect(() => {
    getData();
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
