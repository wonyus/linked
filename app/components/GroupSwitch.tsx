"use client";
import { SWLoading } from "@App/device/devices";
import { IDevice, ISwitchData } from "@Interface/Devices/Switch/BasicSwitch";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Tab from "@mui/material/Tab";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useDeleteDeviceMutation } from "@Redux/services/devices";
import * as React from "react";
import { isMobile } from "react-device-detect";

import ConFirmDialog from "./Dialog/Confirm";
import MapScheduler from "./MapScheduler";
import { BasicSwitch } from "./Switch";

const GroupSwitchStyled = styled(Paper)(({ theme }) => ({
  // width: "",
  elevation: 3,
  background: theme.palette.background.paper,
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: "center",
}));

/*eslint no-unused-vars: "off"*/
interface GroupSwitchProps {
  data: IDevice;
  onSwitchChange: (clientId: string, switchId: number, checked: boolean) => void;
  onUpdate: (device: IDevice) => void;
  swloading: SWLoading;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  paddingTop?: boolean;
}

const GroupSwitch = ({ data, onSwitchChange, onUpdate, swloading }: GroupSwitchProps) => {
  const [deleteDevice, resultDeleDevice] = useDeleteDeviceMutation();
  const [deleteDialog, setDeleteDialog] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [schedulerTab, setSchedulerTab] = React.useState("0");
  const [tab, setTab] = React.useState("0");

  const [device, setDevice] = React.useState<IDevice>({} as IDevice);
  const updateStateWithKey = (key: string, value: any) => {
    setDevice((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleClose = () => {
    setOpen((status) => !status);
  };

  const handleOpen = () => {
    setDevice(data);
    setOpen(true);
  };

  const handleUpdateDevice = (device: IDevice) => {
    setDevice(device);
    onUpdate(device);
    setOpen(false);
  };

  const handleDelete = () => {
    deleteDevice(device.id);
    setDeleteDialog(false);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
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

    return value === index ? (
      <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
        {" "}
        <Box sx={{ paddingTop: paddingTop ? undefined : 0 }}>{children}</Box>{" "}
      </div>
    ) : (
      <></>
    );
  }

  return (
    <>
      <GroupSwitchStyled variant="elevation">
        <Stack spacing={4} direction="row" sx={{ placeContent: "space-around", alignItems: "center" }}>
          <Icon color={data?.status_online ? "primary" : "secondary"} fontSize="medium">
            <PowerSettingsNewIcon />
          </Icon>
          <Typography variant="body1">{data?.name}</Typography>
          <IconButton color="primary" aria-label="settings" size="small" onClick={handleOpen}>
            <SettingsOutlinedIcon />
          </IconButton>
        </Stack>
        <Grid container key={data.id} rowSpacing={2} columnSpacing={2} sx={{ paddingTop: 1 }}>
          {data?.data?.map((sw: ISwitchData) => (
            <Grid item key={sw.switch_id} xs>
              <BasicSwitch
                key={sw.switch_id}
                data={sw}
                disabled={!data?.status_online}
                handleChange={onSwitchChange}
                loading={swloading.loading && sw.switch_id == swloading.switchId}
              />
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
            <TabContext value={tab}>
              <Box sx={{ display: "flex", justifyContent: "space-between", padding: 1 }}>
                <TabList
                  onChange={handleChange}
                  aria-label="devices tab"
                  sx={{ paddingTop: 0 }}
                  scrollButtons="auto"
                  variant="scrollable"
                  allowScrollButtonsMobile
                >
                  <Tab label="General" value={"0"} />
                  <Tab label="Scheduler" value={"1"} />
                </TabList>
                <IconButton color="default" aria-label="settings" size="small" onClick={handleClose}>
                  <CloseOutlinedIcon />
                </IconButton>
              </Box>

              <TabPanel value={"0"}>
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
              </TabPanel>
              <TabPanel value={"1"} sx={{ padding: 0 }}>
                <MapScheduler
                  values={device.data}
                  tab={schedulerTab}
                  onTabChange={setSchedulerTab}
                  onChange={(e) => {
                    updateStateWithKey("data", e);
                  }}
                />
              </TabPanel>
            </TabContext>
            <Box sx={{ display: "flex", justifyContent: "flex-end", padding: 1, marginTop: "auto" }}>
              <Button variant="contained" color="success" onClick={() => handleUpdateDevice(device)} sx={{ marginRight: 1 }}>
                Save
              </Button>
              <Button variant="contained" color="warning" onClick={handleClose} sx={{ marginRight: 1 }}>
                Cancel
              </Button>
              <Button variant="contained" color="error" onClick={() => setDeleteDialog(true)}>
                Delete
              </Button>
            </Box>
          </Paper>
        </Box>
      </Backdrop>
      <ConFirmDialog open={deleteDialog} onClose={() => setDeleteDialog(false)} onConfirm={handleDelete} type={"Delete"} key={"delete-dialog"} />
    </>
  );
};

export default GroupSwitch;
