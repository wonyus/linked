import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { Middleware } from "redux";
import logger from "redux-logger";

import { deviceSlice } from "./reducers/deviceSlice";

const rootReducer = combineReducers({
  [deviceSlice.name]: deviceSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(logger as Middleware),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
