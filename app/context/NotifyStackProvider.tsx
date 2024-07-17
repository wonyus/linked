"use client";
import { SnackbarProvider } from "notistack";

export default function NotifyStackProvider({ children }: { children: React.ReactNode }) {
  return <SnackbarProvider>{children}</SnackbarProvider>;
}
