"use client";
import { IDevice, ISwitchData } from "@Interface/Devices/Switch/BasicSwitch";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { Backdrop, Box, Button, Grid, Icon, IconButton, TextField, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import * as React from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { BasicSwitch } from "./Switch";

const GroupSwitchStyled = styled(Paper)(({ theme }) => ({
  // width: "",
  elevation: 3,
  background: grey[300],
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: "center",
}));

/*eslint no-unused-vars: "off"*/
interface Props {
  data: IDevice;
  handleChange: (clientId: string, switchId: number, checked: boolean) => void;
  handleUpdateDevice: (device: IDevice) => void;
}

const GroupSwitch = (props: Props) => {
  const [open, setOpen] = React.useState(false);
  const [device, setDevice] = React.useState<IDevice>(props.data ?? {});

  const updateStateWithKey = (key: string, value: any) => {
    setDevice((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleClose = () => {
    setOpen((status) => !status);
    setDevice(props.data ?? {});
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleUpdateDevice = (device: IDevice) => {
    props.handleUpdateDevice(device);
    setOpen(false);
  };

  return (
    <>
      <GroupSwitchStyled variant="elevation">
        <Stack spacing={4} direction="row" sx={{ placeContent: "space-around", alignItems: "center" }}>
          <Icon color={device?.status_online ? "primary" : "secondary"} fontSize="medium">
            <PowerSettingsNewIcon />
          </Icon>
          <Typography variant="body1">{device?.name}</Typography>
          <IconButton color="primary" aria-label="settings" size="small" onClick={handleOpen}>
            <SettingsOutlinedIcon />
          </IconButton>
        </Stack>
        <Grid container key={device.id} rowSpacing={2} columnSpacing={2} sx={{ paddingTop: 1 }}>
          {device?.data?.map((sw: ISwitchData) => (
            <Grid item key={sw.switch_id} xs>
              <BasicSwitch key={sw.switch_id} data={sw} handleChange={props.handleChange} />
            </Grid>
          ))}
        </Grid>
      </GroupSwitchStyled>
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
        <Box>
          <Paper elevation={3}>
            <Box sx={{ display: "flex", justifyContent: "space-between", padding: 1 }}>
              <Typography variant="h6" sx={{ paddingLeft: 1 }}>
                Settings
              </Typography>
              <IconButton color="default" aria-label="settings" size="small" onClick={handleClose}>
                <CloseOutlinedIcon />
              </IconButton>
            </Box>
            <Grid container sx={{ padding: 1, width: 300 }}>
              <TextField
                id="outlined-basic"
                label="Name"
                variant="outlined"
                value={device.name ?? ""}
                fullWidth
                onChange={(e) => {
                  updateStateWithKey("name", e.target.value);
                }}
                sx={{ paddingBottom: 2 }}
              />
              {device?.data?.map((sw: ISwitchData, idx: number) => (
                <TextField
                  key={idx}
                  id={`switch ${idx + 1}`}
                  label={`switch ${idx + 1}`}
                  variant="outlined"
                  value={device.data[idx].name ?? ""}
                  fullWidth
                  onChange={(e) => {
                    let newState = [...device.data];
                    newState[idx] = { ...newState[idx], name: e.target.value };
                    updateStateWithKey("data", newState);
                  }}
                  sx={{ paddingBottom: 2 }}
                />
              ))}
            </Grid>
            <Box sx={{ display: "flex", justifyContent: "flex-end", padding: 1 }}>
              <Button variant="contained" color="success" onClick={() => handleUpdateDevice(device)} sx={{ marginRight: 1 }}>
                Save
              </Button>
              <Button variant="contained" color="error" onClick={handleClose}>
                Cancel
              </Button>
            </Box>
          </Paper>
        </Box>
      </Backdrop>
    </>
  );
};

export default GroupSwitch;
