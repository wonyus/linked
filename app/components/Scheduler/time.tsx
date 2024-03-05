import CloseIcon from "@mui/icons-material/Close";
import { Box, Grid, Icon, IconButton, Typography } from "@mui/material";
import { MobileTimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import React from "react";

interface TimeSettingProps {
  header: string;
  times: [Dayjs, Dayjs][];
  onChange: (values: Dayjs, idx: number, type: "on" | "off") => void;
  onRemove: (idx: number) => void;
}

const TimeSettings = ({ header, times, onChange }: TimeSettingProps) => {
  return (
    <Grid
      container
      rowSpacing={1}
      columnGap={0.5}
      columnSpacing={0}
      flexDirection="row"
      key={`Grid-Time-Settings`}
      sx={{
        // width: "100%",
        maxWidth: 400,
        paddingLeft: 1.5,
        paddingBottom: 1.5,
        marginTop: 1,
        marginBottom: 1,
        border: 1,
        borderRadius: 1,
        borderColor: "primary.main",
      }}
    >
      <Grid item key={header} xs={12} justifyContent={"flex-start"}>
        <Typography>{header}</Typography>
      </Grid>
      <Grid item key={`${header}-time`} xs={12} justifyContent={"flex-start"}>
        {times.map((t, idx, arr) => (
          <React.Fragment key={`${idx}-li`}>
            <Grid container paddingTop={1}>
              <Grid item xs={1.7} key={`${idx}-hr-on`}>
                <MobileTimePicker
                  key={`${idx}-hr-pk-on`}
                  label={"hr"}
                  value={t[0]}
                  onChange={(e) => {
                    onChange(dayjs(e), idx, "on");
                  }}
                  openTo="hours"
                  views={["hours"]}
                  ampm={false}
                  sx={{
                    "& .MuiInputBase-root": {
                      height: "35px",
                      width: "50px",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={1.7} key={`${idx}-mi-on`}>
                <MobileTimePicker
                  key={`${idx}-mi-pk-on`}
                  label={"mi"}
                  value={t[0]}
                  onChange={(e) => {
                    onChange(dayjs(e), idx, "on");
                  }}
                  openTo="minutes"
                  views={["minutes"]}
                  sx={{
                    "& .MuiInputBase-root": {
                      height: "35px",
                      width: "50px",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={1.7} key={`${idx}-se-on`}>
                <MobileTimePicker
                  key={`${idx}-se-pk-on`}
                  label={"se"}
                  value={t[0]}
                  onChange={(e) => {
                    onChange(dayjs(e), idx, "on");
                  }}
                  openTo="seconds"
                  views={["seconds"]}
                  sx={{
                    "& .MuiInputBase-root": {
                      height: "35px",
                      width: "50px",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={0.5} key={`${idx}-dash`} sx={{ alignSelf: "center", justifyContent: "center", display: "flex",pr:0.4 }}>
                <Typography key={`${idx}-time`} variant="subtitle2">
                  &nbsp;{`-`}&nbsp;
                </Typography>
              </Grid>
              <Grid item xs={1.7} key={`${idx}-hr-off`}>
                <MobileTimePicker
                  key={`${idx}-hr-pk-off`}
                  label={"hr"}
                  value={t[1]}
                  onChange={(e) => {
                    onChange(dayjs(e), idx, "off");
                  }}
                  openTo="hours"
                  views={["hours"]}
                  ampm={false}
                  sx={{
                    "& .MuiInputBase-root": {
                      height: "35px",
                      width: "50px",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={1.7} key={`${idx}-mi-off`}>
                <MobileTimePicker
                  key={`${idx}-mi-pk-off`}
                  label={"mi"}
                  value={t[1]}
                  onChange={(e) => {
                    onChange(dayjs(e), idx, "off");
                  }}
                  openTo="minutes"
                  views={["minutes"]}
                  sx={{
                    "& .MuiInputBase-root": {
                      height: "35px",
                      width: "50px",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={1.7} key={`${idx}-se-off`}>
                <MobileTimePicker
                  key={`${idx}-se-pk-off`}
                  label={"se"}
                  value={t[1]}
                  onChange={(e) => {
                    onChange(dayjs(e), idx, "off");
                  }}
                  openTo="seconds"
                  views={["seconds"]}
                  sx={{
                    "& .MuiInputBase-root": {
                      height: "35px",
                      width: "50px",
                    },
                  }}
                />
              </Grid>
              {arr.length > 1 && (
                <Grid item xs={0.5} key={`${idx}-rm`} alignSelf={"center"}>
                  <IconButton size="small" key={`${idx}-rm-btn`}>
                    <CloseIcon key={`${idx}-rm-ico`} />
                  </IconButton>
                </Grid>
              )}
            </Grid>
          </React.Fragment>
        ))}
      </Grid>
    </Grid>
  );
};

export default TimeSettings;
