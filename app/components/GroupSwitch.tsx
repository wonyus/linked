"use client";
import { IDevice, ISwitchData } from "@Interface/Devices/Switch/BasicSwitch";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { Backdrop, Box, Button, Grid, Icon, IconButton, Tab, Tabs, TextField, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import * as React from "react";
import { isMobile } from "react-device-detect";

import MapScheduler from "./MapScheduler";
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
interface GroupSwitchProps {
  data: IDevice;
  onSwitchChange: (clientId: string, switchId: number, checked: boolean) => void;
  onUpdate: (device: IDevice) => void;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  paddingTop?: boolean;
}

const GroupSwitch = ({ data, onSwitchChange, onUpdate }: GroupSwitchProps) => {
  const [open, setOpen] = React.useState(false);
  const [device, setDevice] = React.useState<IDevice>(data ?? {});

  const [tab, setTab] = React.useState(0);
  const [schedulerTab, setSchedulerTab] = React.useState(0);

  const updateStateWithKey = (key: string, value: any) => {
    setDevice((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleClose = () => {
    setOpen((status) => !status);
    setDevice(data ?? {});
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleUpdateDevice = (device: IDevice) => {
    setDevice(device);
    onUpdate(device);
    setOpen(false);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, paddingTop = true, ...other } = props;

    return (
      <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
        {value === index && <Box sx={{ paddingTop: paddingTop ? undefined : 0 }}>{children}</Box>}
      </div>
    );
  }

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
              <BasicSwitch key={sw.switch_id} data={sw} handleChange={onSwitchChange} />
            </Grid>
          ))}
        </Grid>
      </GroupSwitchStyled>
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1, overflowY: "scroll" }} open={open}>
        <Box sx={{ alignSelf: "flex-start", marginTop: 5 }}>
          <Paper
            elevation={3}
            sx={{
              width: !isMobile ? 650 : undefined,
              minHeight: !isMobile ? 800 : undefined,
              flexDirection: "column",
              display: "flex",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between", padding: 1 }}>
              <Tabs value={tab} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="General" {...a11yProps(0)} />
                <Tab label="Scheduler" {...a11yProps(1)} />
              </Tabs>
              <IconButton color="default" aria-label="settings" size="small" onClick={handleClose}>
                <CloseOutlinedIcon />
              </IconButton>
            </Box>

            <CustomTabPanel value={tab} index={0}>
              <Grid container sx={{ padding: 1 }}>
                <TextField
                  key={device.id}
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
                    key={sw.switch_id}
                    id={`switch ${idx + 1}`}
                    label={`switch ${idx + 1}`}
                    variant="outlined"
                    value={sw.name ?? ""}
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
            </CustomTabPanel>
            <CustomTabPanel value={tab} index={1} paddingTop={false}>
              <MapScheduler
                values={device.data}
                tab={schedulerTab}
                onTabChange={setSchedulerTab}
                onChange={(e) => {
                  updateStateWithKey("data", e);
                }}
              />
            </CustomTabPanel>

            <Box sx={{ display: "flex", justifyContent: "flex-end", padding: 1, marginTop: "auto" }}>
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
