"use client";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import React from "react";
import ChangePassword from "./changePassword";
import { SxProps, Theme } from "@mui/material";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  sx?: SxProps<Theme>;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, sx, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      sx={{ paddingTop: 2, ...sx }}
    >
      {value === index && <Box>{children}</Box>}
    </Box>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ flexGrow: 1, display: "flex" }}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, paddingRight: 5, borderColor: "divider" }}
      >
        <Tab label="Profile" {...a11yProps(0)} />
        <Tab label="Edit Setting" {...a11yProps(1)} />
        <Tab label="Change Password" {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        Profile
      </TabPanel>
      <TabPanel value={value} index={1}>
        Edit Setting
      </TabPanel>
      <TabPanel value={value} index={2} sx={{ width: "70%" }}>
        <ChangePassword />
      </TabPanel>
    </Box>
  );
}
