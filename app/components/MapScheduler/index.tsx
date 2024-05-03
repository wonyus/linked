import Scheduler, { TSchedulerInitialValues } from "@Components/Scheduler";
import { ISwitchData } from "@Interface/Devices/Switch/BasicSwitch";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import React from "react";

interface MapSchedulerProps {
  values: ISwitchData[];
  onChange: (values: ISwitchData[]) => void;
  tab: string;
  onTabChange: (tab: string) => void;
}
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const MapScheduler = ({ values, onChange, tab, onTabChange }: MapSchedulerProps) => {
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
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
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }
  const handleTimeChange = (scheduler: TSchedulerInitialValues, idx: number) => {
    const newValues: ISwitchData[] = values.map((v) => ({ ...v }));
    newValues[idx].scheduler = scheduler;
    onChange(newValues);
  };

  const handleActiveChange = (active: boolean, idx: number) => {
    const newValues: ISwitchData[] = values.map((v) => ({ ...v }));
    newValues[idx].scheduler_active = active;
    onChange(newValues);
  };
  return (
    <React.Fragment>
      <TabContext value={tab}>
        <TabList
          onChange={handleChange}
          aria-label="devices tab"
          sx={{ paddingTop: 0 }}
          scrollButtons="auto"
          variant="scrollable"
          allowScrollButtonsMobile
        >
          {values &&
            values.map((value, idx) => {
              return <Tab label={value.name} key={idx} value={`${idx}`} />;
            })}
        </TabList>
        <React.Fragment>
          {values &&
            values.map((value, idx) => {
              return (
                <TabPanel key={idx} value={`${idx}`}>
                  <Scheduler
                    initialValues={value.scheduler}
                    initialValueActive={value.scheduler_active}
                    onCheckActive={(val) => handleActiveChange(val, idx)}
                    onChange={(e) => handleTimeChange(e, idx)}
                  />
                </TabPanel>
              );
            })}
        </React.Fragment>
      </TabContext>
    </React.Fragment>
  );
};

export default MapScheduler;
