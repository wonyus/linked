"use client";
import { green, grey } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

let Theme = createTheme({
  components: {
    MuiIcon: {
      variants: [
        {
          props: { color: "primary" },
          style: {
            color: green[500],
          },
        },
        {
          props: { color: "secondary" },
          style: {
            color: grey[500],
          },
        },
      ],
    },
  },
  palette: {},
});

export default Theme;
