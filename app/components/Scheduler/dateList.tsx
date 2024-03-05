import { Grid, Stack, ToggleButton, Typography } from "@mui/material";
import React from "react";

interface DateListProps {
  header: string;
  dates: [number, boolean][];
  onClearAll: (values: [number, boolean][], type: string) => void;
  onSelectAll: (values: [number, boolean][], type: string) => void;
  onSelectDate: (values: [number, boolean][], key: number, type: string) => void;
}

const DateList = ({ header, dates, onClearAll, onSelectAll, onSelectDate }: DateListProps) => {
  return (
    <>
      <Grid
        container
        rowSpacing={1}
        columnGap={0.5}
        columnSpacing={0}
        sx={{
          height: 281,
          maxWidth: 310,
          paddingLeft: 1.5,
          paddingBottom: 1.5,
          marginTop: 1,
          marginBottom: 1,
          border: 1,
          borderRadius: 1,
          borderColor: "primary.main",
        }}
      >
        <Grid item xs={12} key={header} justifyContent={"flex-start"}>
          <Typography>{header}</Typography>
        </Grid>
        <Grid item xs={12} key={"btn"} justifyContent={"flex-start"}>
          <Stack direction="row" spacing={1}>
            <Typography
              onClick={() => onSelectAll(dates, "dates")}
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
              onClick={() => onClearAll(dates, "dates")}
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

        {dates.map(([key, value]) => (
          <Grid item xs={1.5} key={key}>
            <ToggleButton
              value="check"
              selected={value}
              size="small"
              onChange={() => {
                onSelectDate(dates, key, "dates");
              }}
              defaultValue={key}
              sx={{ width: 30, height: 30 }}
            >
              <Typography sx={{ fontSize: 12 }}>{key}</Typography>
            </ToggleButton>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default DateList;
