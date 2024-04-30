import GradientCircularProgress from "@Components/CircularProgress/GradientCircularProgress";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React from "react";

export interface ICardDashboard {
  count?: number;
  text: string;
  isLoading: boolean;
}

const CardDashboard = ({ count, text, isLoading }: ICardDashboard) => {
  return (
    <Box>
      <Paper>
        <Stack direction="column" spacing={0}>
          <Typography variant="h6" textAlign={"left"} sx={{ paddingLeft: 2, paddingTop: 1, paddingBottom: 0 }}>
            {text}
          </Typography>
          {isLoading ? (
            <Box alignSelf={"center"} sx={{ paddingBottom: 4 }}>
              <GradientCircularProgress size={30} />
            </Box>
          ) : (
            <Typography variant="h3" textAlign={"center"} sx={{ paddingBottom: 2, marginTop: 0 }}>
              {count}
            </Typography>
          )}
        </Stack>
      </Paper>
    </Box>
  );
};

export default CardDashboard;
