import Scheduler, { TSchedulerInitialValues } from "@Components/Scheduler";
import { ISwitchData } from "@Interface/Devices/Switch/BasicSwitch";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import React from "react";

interface MapSchedulerProps {
  values: ISwitchData[];
  onChange: (values: ISwitchData[]) => void;
  tab: number;
  onTabChange: (tab: number) => void;
}
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const MapScheduler = ({ values, onChange, tab, onTabChange }: MapSchedulerProps) => {
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    onTabChange(newValue);
  };
  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    return (
      <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  const handleTimeChange = (scheduler: TSchedulerInitialValues, idx: number) => {
    const newValues: ISwitchData[] = values.map((v) => ({ ...v }));
    newValues[idx].scheduler = scheduler;
    onChange(newValues);
  };
  return (
    <React.Fragment>
      <Tabs value={tab} onChange={handleChange} aria-label="devices tab" sx={{ paddingTop: 0 }}>
        {values &&
          values.map((value, idx) => {
            return <Tab label={value.name} key={idx} {...a11yProps(idx)} />;
          })}
      </Tabs>
      <React.Fragment>
        {values &&
          values.map((value, idx) => {
            return (
              <CustomTabPanel value={tab} key={idx} index={idx}>
                <Scheduler initialValues={value.scheduler} onChange={(e) => handleTimeChange(e, idx)} />
              </CustomTabPanel>
            );
          })}
      </React.Fragment>
    </React.Fragment>
  );
};

export default MapScheduler;
