"use client";
import { deepPurple, green, grey } from "@mui/material/colors";
import GlobalStyles from "@mui/material/GlobalStyles";
import { Experimental_CssVarsProvider as CssVarsProvider, experimental_extendTheme as extendTheme } from "@mui/material/styles";
import React, { ReactNode } from "react";

const theme = extendTheme({
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
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: deepPurple[600],
          contrastText: "#fff",
        },
        secondary: {
          light: "#ff7961",
          main: "#f44336",
          dark: "#ba000d",
          contrastText: "#000",
        },
        background: {
          default: grey[50],
          paper: grey[200],
        },
        text: {
          primary: grey[900],
          secondary: grey[800],
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: deepPurple[800],
          contrastText: "#fff",
        },
        secondary: {
          light: "#ff7961",
          main: "#f44336",
          dark: "#ba000d",
          contrastText: "#000",
        },
        background: {
          default: grey[900],
          paper: grey[800],
        },
        text: {
          primary: grey[50],
          secondary: grey[100],
        },
      },
    },
  },
});

const ThemeApp = ({ children }: { children: ReactNode }) => {
  return (
    <CssVarsProvider theme={theme} modeStorageKey="mui-mode" defaultMode="light">
      <GlobalStyles
        styles={{
          body: { backgroundColor: theme.vars.palette.background.default },
        }}
      />
      {children}
    </CssVarsProvider>
  );
};

export default ThemeApp;
