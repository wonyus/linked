import { Button, Grid, Stack, ToggleButton, Typography } from "@mui/material";
import React, { use } from "react";

interface DayListProps {
  header: string;
  days: [number, boolean][];
  dayName: Map<number, string>;
  onClearAll: (values: [number, boolean][], type: string) => void;
  onSelectAll: (values: [number, boolean][], type: string) => void;
  onSelectDay: (values: [number, boolean][], key: number, type: string) => void;
}

const DayList = ({ header, days, dayName, onClearAll, onSelectAll, onSelectDay }: DayListProps) => {
  return (
    <>
      <Grid
        container
        rowSpacing={1}
        columnGap={0.5}
        columnSpacing={0}
        sx={{
          maxWidth: 280,
          paddingLeft: 1.5,
          paddingBottom: 1.5,
          marginTop: 1,
          marginBottom: 1,
          border: 1,
          borderRadius: 1,
          borderColor: "secondary.main",
        }}
      >
        <Grid item xs={12} key={header} justifyContent={"flex-start"}>
          <Typography>{header}</Typography>
        </Grid>
        <Grid item xs={12} key={"btn"} justifyContent={"flex-start"}>
          <Stack direction="row" spacing={1}>
            <Typography
              onClick={() => onSelectAll(days, "days")}
              variant="subtitle2"
              sx={{
                cursor: "pointer",
                color: "primary.main",
                "&:hover": {
                  color: "primary.light",
                },
              }}
            >
              Select all
            </Typography>
            <Typography
              onClick={() => onClearAll(days, "days")}
              variant="subtitle2"
              sx={{
                cursor: "pointer",
                color: "primary.main",
                "&:hover": {
                  color: "primary.light",
                },
              }}
            >
              Clear all
            </Typography>
          </Stack>
        </Grid>

        {days.map(([key, value]) => (
          <Grid item xs={1.5} key={key}>
            <ToggleButton
              value="check"
              selected={value}
              size="small"
              onChange={() => {
                onSelectDay(days, key, "days");
              }}
              defaultValue={key}
              sx={{ width: 30, height: 30 }}
            >
              <Typography sx={{ fontSize: 12 }}>{dayName.get(key)}</Typography>
            </ToggleButton>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default DayList;
