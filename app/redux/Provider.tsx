import React from "react";
import { Provider } from "react-redux";

import { store } from "./store";

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}

export const ReduxWrapper = ({ Component }: { Component: React.FC }) => {
  return (
      <ReduxProvider>
        <Component />
      </ReduxProvider>
  );
};

export default ReduxWrapper;
