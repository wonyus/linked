"use client";
import GradientCircularProgress from "@Components/CircularProgress/GradientCircularProgress";
import { ISwitchData } from "@Interface/Devices/Switch/BasicSwitch";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import * as React from "react";

import IOSSwitch from "./IOSSwitch";

const BasicSwitchStyled = styled(Paper)(({ theme }) => ({
  width: 90,
  height: 90,
  elevation: 3,
  padding: theme.spacing(1),
  ...theme.typography.body2,
  textAlign: "center",
}));

interface Props {
  data: ISwitchData;
  handleChange: (clientId: string, switchId: number, checked: boolean) => void;
  loading: boolean;
  disabled: boolean;
}

export default function BasicSwitch({ data, handleChange, loading, disabled }: Props) {
  const loadingComponent: any = {};
  if (loading) {
    loadingComponent.icon = <GradientCircularProgress size={30} />;
    loadingComponent.checkedIcon = <GradientCircularProgress size={30} />;
  }

  return (
    <>
      <BasicSwitchStyled variant="elevation" sx={{ width: "inherit" }}>
        <Stack direction="column" sx={{ paddingTop: 0, alignItems: "center", height: "100%", justifyContent: "space-between" }}>
          <Typography variant="body1">{data.name}</Typography>
          <IOSSwitch
            {...loadingComponent}
            disabled={disabled}
            id={String(data.switch_id)}
            name={data.name}
            checked={data.status}
            color="success"
            onChange={(_, checked) => handleChange(data.client_id, data.switch_id, checked)}
          />
        </Stack>
      </BasicSwitchStyled>
    </>
  );
}
