"use client";
import * as React from "react";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { Grid, Icon, Switch, Typography } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import Image from "next/image";
import { Device, SwitchData } from "@Interface/Devices/Switch/BasicSwitch";
import { BasicSwitch } from "./Switch";
import { grey } from "@mui/material/colors";

const GroupSwitchStyled = styled(Paper)(({ theme }) => ({
  // width: "",
  elevation: 3,
  background: grey[300],
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: "center",
}));

interface Props {
  data: Device;
  handleChange: (clientId: string, switchId: number, checked: boolean) => void;
}

const GroupSwitch = (props: Props) => {
  console.log(props.data);

  return (
    <GroupSwitchStyled  variant="elevation" >
      <Stack spacing={4} direction="row" sx={{ placeContent: "space-around" }}>
        <Image src={"/static/icon/power-off.png"} width={30} height={30} alt="switch" />
        <Typography variant="body1">{props.data?.client_id}</Typography>
        <Icon color={props.data?.status_online ? "primary" : "secondary"}>
          <FiberManualRecordIcon />
        </Icon>
      </Stack>
      <Grid container key={props.data.id} rowSpacing={2} columnSpacing={2} sx={{ paddingTop: 1 }}>
        {props.data?.data?.map((device: SwitchData) => (
          <Grid item key={device.switch_id} xs>
            <BasicSwitch key={device.switch_id} data={device} handleChange={props.handleChange} />
          </Grid>
        ))}
      </Grid>
    </GroupSwitchStyled>
  );
};

export default GroupSwitch;
