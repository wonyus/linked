import { Grid } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import React, { Suspense, use } from "react";

import DateList from "./dateList";
import DayList from "./dayList";
import MonthList from "./monthList";
import TimeSettings from "./time";
import { isMobile } from "react-device-detect";
const mapDayNames = new Map([
  [0, "Su"],
  [1, "Mo"],
  [2, "Tu"],
  [3, "We"],
  [4, "Th"],
  [5, "Fr"],
  [6, "Sa"],
]);

const mapDays = new Map([
  [0, false],
  [1, false],
  [2, false],
  [3, false],
  [4, false],
  [5, false],
  [6, false],
]);

const mapDates: Map<number, boolean> = new Map([
  [1, false],
  [2, false],
  [3, false],
  [4, false],
  [5, false],
  [6, false],
  [7, false],
  [8, false],
  [9, false],
  [10, false],
  [11, false],
  [12, false],
  [13, false],
  [14, false],
  [15, false],
  [16, false],
  [17, false],
  [18, false],
  [19, false],
  [20, false],
  [21, false],
  [22, false],
  [23, false],
  [24, false],
  [25, false],
  [26, false],
  [27, false],
  [28, false],
  [29, false],
  [30, false],
  [31, false],
]);

const mapMonths = new Map([
  [1, false],
  [2, false],
  [3, false],
  [4, false],
  [5, false],
  [6, false],
  [7, false],
  [8, false],
  [9, false],
  [10, false],
  [11, false],
  [12, false],
]);

const mapMonthNames = new Map([
  [1, "Jan"],
  [2, "Feb"],
  [3, "Mar"],
  [4, "Apr"],
  [5, "May"],
  [6, "Jun"],
  [7, "Jul"],
  [8, "Aug"],
  [9, "Sep"],
  [10, "Oct"],
  [11, "Nov"],
  [12, "Dec"],
]);

const mapTimes: [string, string][] = [
  ["2024-05-03T14:30:00", "2024-05-03T15:30:00"],
  ["2024-05-03T14:30:00", "2024-05-03T15:30:00"],
];

export type TSchedulerInitialValues = {
  days: [number, boolean][];
  dates: [number, boolean][];
  months: [number, boolean][];
  times: [string, string][];
};
interface SchedulerProps {
  initialValues: TSchedulerInitialValues;
  onChange: (values: TSchedulerInitialValues) => void;
}
export const initialValuesProps: TSchedulerInitialValues = {
  days: Array.from(mapDays),
  dates: Array.from(mapDates),
  months: Array.from(mapMonths),
  times: mapTimes,
};

const Scheduler = ({ initialValues = initialValuesProps, onChange }: SchedulerProps) => {
  const dataform = React.useDeferredValue(initialValues);

  const handleChange = (values: [number, boolean][] | [string, string][], type: string) => {
    if (type === "days") {
      onChange({ days: values as [number, boolean][], dates: dataform.dates, months: dataform.months, times: dataform.times });
    } else if (type === "dates") {
      onChange({ days: dataform.days, dates: values as [number, boolean][], months: dataform.months, times: dataform.times });
    } else if (type === "months") {
      onChange({ days: dataform.days, dates: dataform.dates, months: values as [number, boolean][], times: dataform.times });
    } else {
      onChange({ days: dataform.days, dates: dataform.dates, months: dataform.months, times: values as [string, string][] });
    }
  };

  const onChecked = (values: [number, boolean][], key: number, type: string) => {
    const newValues = new Map(values);
    newValues.set(key, !newValues.get(key));
    handleChange(Array.from(newValues), type);
  };

  const onClearAll = (values: [number, boolean][], type: string) => {
    const newValues = new Map(values);
    newValues.forEach((value, key) => {
      newValues.set(key, false);
    });
    handleChange(Array.from(newValues), type);
  };

  const onSelectAll = (values: [number, boolean][], type: string) => {
    const newValues = new Map(values);
    newValues.forEach((value, key) => {
      newValues.set(key, true);
    });
    handleChange(Array.from(newValues), type);
  };

  const onTimeChange = (time: Dayjs, idx: number, type: "on" | "off") => {
    const newTimes = [...dataform.times!];
    newTimes[idx] = type === "on" ? [time.format("YYYY-MM-DDTHH:mm:ssZ"), newTimes[idx][1]] : [newTimes[idx][0], time.format("YYYY-MM-DDTHH:mm:ssZ")];
    console.log(time.format("YYYY-MM-DDTHH:mm:ssZ"));

    handleChange(newTimes, "times");
  };

  const onRemoveTime = (idx: number) => {
    const newTimes = [...dataform.times!];
    newTimes.splice(idx, 1);
    handleChange(newTimes, "times");
  };

  const convertStringToDate = (values: [string, string][]) => {
    const newValues: [Dayjs, Dayjs][] = values.map((value) => [dayjs(value[0]), dayjs(value[1])]);
    return newValues;
  };

  return (
    <>
      <Grid container justifyContent={"space-between"} columnSpacing={isMobile ? 1 : undefined}>
        <Grid item xs={isMobile ? 5 : 6}>
          <DayList
            header={"day of week"}
            days={dataform.days}
            dayName={mapDayNames}
            onSelectDay={onChecked}
            onClearAll={onClearAll}
            onSelectAll={onSelectAll}
          />
        </Grid>
        <Grid item xs={isMobile ? 7 : 6}>
          <MonthList
            header={"month"}
            months={dataform.months}
            monthName={mapMonthNames}
            onSelectMonth={onChecked}
            onClearAll={onClearAll}
            onSelectAll={onSelectAll}
          />
        </Grid>

        <Grid item xs={12}>
          <DateList header={"date of month"} dates={dataform.dates} onSelectDate={onChecked} onClearAll={onClearAll} onSelectAll={onSelectAll} />
        </Grid>
        <Grid item xs={isMobile ? 12 : 9}>
          <TimeSettings header={"time setting"} times={convertStringToDate(dataform.times)} onChange={onTimeChange} onRemove={onRemoveTime} />
        </Grid>
      </Grid>
    </>
  );
};

export default Scheduler;
