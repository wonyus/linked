"use client";
import { ISwitchData } from "@Interface/Devices/Switch/BasicSwitch";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import * as React from "react";

const BasicSwitchStyled = styled(Paper)(({ theme }) => ({
  width: 90,
  height: 90,
  elevation: 3,
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: "center",
}));

interface Props {
  data: ISwitchData;
  handleChange: (clientId: string, switchId: number, checked: boolean) => void;
}

export default function BasicSwitch({ data, handleChange }: Props) {
  return (
    <>
      <BasicSwitchStyled variant="elevation" sx={{ width: "inherit" }}>
        <Stack direction="column" sx={{ paddingTop: 1, alignItems: "center" }}>
          <Typography variant="body1">{data.name}</Typography>
          <Switch
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
