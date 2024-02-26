import "./globals.css";

import Theme from "@App/theme";
import Navbar from "@Components/Navbar";
import { ThemeProvider } from "@mui/material";
import type { Metadata } from "next";

import AuthProvider from "./context/AuthProvider";

export const metadata: Metadata = {
  title: "Linked",
  description: "Linked is a home automation platform that allows you to control your smart devices from anywhere in the world.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <AuthProvider>
          <ThemeProvider theme={Theme}>
            <body>
              <Navbar />
              <main style={{ margin: 20 }}>{children}</main>
            </body>
          </ThemeProvider>
      </AuthProvider>
    </html>
  );
}
