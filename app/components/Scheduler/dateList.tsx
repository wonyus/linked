import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import ToggleButton from "@mui/material/ToggleButton";
import Typography from "@mui/material/Typography";
import React from "react";
import { isMobile } from "react-device-detect";

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
        <Grid item xs={12}>
          <Grid container rowSpacing={1} columnSpacing={2}>
            {dates.map(([key, value]) => (
              <Grid item xs={isMobile ? 1.14 : 0.9} key={key}>
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
        </Grid>
      </Grid>
    </>
  );
};

export default DateList;
