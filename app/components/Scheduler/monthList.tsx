import { Box, Button, Grid, Stack, ToggleButton, Typography } from "@mui/material";
import React, { use } from "react";
import { isMobile } from "react-device-detect";

interface DayListProps {
  header: string;
  months: [number, boolean][];
  monthName: Map<number, string>;
  onClearAll: (values: [number, boolean][], type: string) => void;
  onSelectAll: (values: [number, boolean][], type: string) => void;
  onSelectMonth: (values: [number, boolean][], key: number, type: string) => void;
}

const MonthList = ({ header, months, monthName, onClearAll, onSelectAll, onSelectMonth }: DayListProps) => {
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
              onClick={() => onSelectAll(months, "months")}
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
              onClick={() => onClearAll(months, "months")}
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
            {months.map(([key, value]) => (
              <Grid item xs={isMobile ? 1.8 : 1.6} key={key}>
                <ToggleButton
                  value="check"
                  selected={value}
                  size="small"
                  onChange={() => {
                    onSelectMonth(months, key, "months");
                  }}
                  defaultValue={key}
                  sx={{ width: 30, height: 30 }}
                >
                  <Typography sx={{ fontSize: 12 }}>{monthName.get(key)}</Typography>
                </ToggleButton>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default MonthList;
