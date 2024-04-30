import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { Middleware } from "redux";
import logger from "redux-logger";

import { deviceSlice } from "./reducers/deviceSlice";
import { devicesApi } from "./services/devices";
import { usersApi } from "./services/users";
import { dashboardApi } from "./services/dashboard";

const rootReducer = combineReducers({
  [devicesApi.reducerPath]: devicesApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
  [dashboardApi.reducerPath]: dashboardApi.reducer
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(devicesApi.middleware).concat(usersApi.middleware).concat(dashboardApi.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
