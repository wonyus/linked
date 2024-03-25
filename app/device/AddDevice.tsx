"use client";
import { IAddDevice } from "@Interface/Devices/Switch/BasicSwitch";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Autocomplete, Backdrop, Box, Button, Grid, IconButton, Paper, Stack, TextField, Typography } from "@mui/material";
import { useCreateDeviceMutation } from "@Redux/services/devices";
import { GenerateID } from "@Utils/Generate";
import React from "react";
import { isMobile } from "react-device-detect";

const AddDevice = () => {
  const [createDevice, createDeviceResult] = useCreateDeviceMutation(); // Use the dispatch function from the store
  const [open, setOpen] = React.useState(false);
  const [clientId, setClientId] = React.useState<string>("");
  const [switchType, setSwitchType] = React.useState<string | null>(null);
  const [switchAmount, setSwitchAmount] = React.useState<number>(1);

  const handleClose = () => {
    setOpen((status) => !status);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleAddDevice = async () => {
    const data: IAddDevice = { client_id: clientId, type: switchType ?? "basic-switch", switch_amount: switchAmount };
    //validate data
    if (!data.client_id || !data.type || !data.switch_amount) {
      return;
    }
    await createDevice(data);
    handleClose();
  };

  const SwitchTypeAutoComplete = () => {
    return (
      <Autocomplete
        id="switch-type"
        options={["basic-switch", "dimmer-switch", "rgb-switch"]}
        fullWidth
        renderInput={(params) => <TextField {...params} label="Switch Type" variant="outlined" />}
        value={switchType}
        onChange={(e, value) => setSwitchType(value ?? null)}
      />
    );
  };
  return (
    <>
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
              <Typography variant="h6" sx={{ ml: 2 }}>
                Add Device
              </Typography>
              <IconButton color="default" aria-label="settings" size="small" onClick={handleClose}>
                <CloseOutlinedIcon />
              </IconButton>
            </Box>
            <Grid container sx={{ padding: 1 }} rowSpacing={2}>
              <Grid item xs={12}>
                <Stack direction="row" spacing={2}>
                  <TextField
                    id="ClientID"
                    label="Client ID"
                    variant="outlined"
                    fullWidth
                    value={clientId}
                    onChange={(e) => setClientId(e.target.value)}
                  />
                  <Button variant="contained" color="primary" onClick={() => setClientId(GenerateID(10))}>
                    Generate
                  </Button>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <SwitchTypeAutoComplete />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="SwitchAmount"
                  type="number"
                  InputProps={{ inputProps: { min: 1, max: 10 } }}
                  label="Switch Amount"
                  variant="outlined"
                  fullWidth
                  value={switchAmount}
                  onChange={(e) => setSwitchAmount(Number(e.target.value))}
                />
              </Grid>
            </Grid>
            <Box sx={{ display: "flex", justifyContent: "flex-end", padding: 1, marginTop: "auto" }}>
              <Button variant="contained" color="success" onClick={() => handleAddDevice()} sx={{ marginRight: 1 }}>
                Save
              </Button>
              <Button variant="contained" color="error" onClick={handleClose}>
                Cancel
              </Button>
            </Box>
          </Paper>
        </Box>
      </Backdrop>
      <Button variant="contained" color="primary" sx={{ alignContent: "flex-end" }} onClick={handleOpen}>
        ADD
      </Button>
    </>
  );
};

export default AddDevice;
