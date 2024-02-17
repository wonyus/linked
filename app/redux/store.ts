import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { deviceSlice } from "./reducers/deviceSlice";
import logger from "redux-logger";
import { Middleware } from "redux";

const rootReducer = combineReducers({
  [deviceSlice.name]: deviceSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(logger as Middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
