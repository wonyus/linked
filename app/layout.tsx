import "./globals.css";

import Navbar from "@Components/Navbar";
import type { Metadata } from "next";

import AuthProvider from "./context/AuthProvider";
import LocalizeDate from "./LocalizeDate";
import ThemeApp from "./theme";
import NotifyStackProvider from "./context/NotifyStackProvider";

export const metadata: Metadata = {
  title: "Linked",
  description: "Linked is a home automation platform that allows you to control your smart devices from anywhere in the world.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <LocalizeDate>
        <NotifyStackProvider>
          <ThemeApp>
            <AuthProvider>
              <body>
                <Navbar />
                <main style={{ margin: 20 }}>{children}</main>
              </body>
            </AuthProvider>
          </ThemeApp>
        </NotifyStackProvider>
      </LocalizeDate>
    </html>
  );
}
