import axiosInstance from "@App/http/axios";
import { Device } from "@Interface/Devices/Switch/BasicSwitch";
import { PublishMessage } from "@Interface/Mesages/Message";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface DeviceUpdate {
  id: number;
  status_switch: boolean;
  status_online: boolean;
}

export interface DeviceState {
  status: string;
  devices: Device[];
  error: null | string;
}

const initialState: DeviceState = {
  status: "success",
  devices: [],
  error: null,
};

interface ErrorRejectedWithValue {
  message: string;
}

export const getAllDevices = createAsyncThunk("device/get_status", async (formData, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.get("/user/get_device_status");
    return res.data;
  } catch (err: any) {
    const data: ErrorRejectedWithValue = {
      message: "Error updating device",
    };
    return rejectWithValue(data);
  }
});

export const fetchDevices = createAsyncThunk("devices/fetch", async (formData, { rejectWithValue }) => {
  try {
    const res = await axios.get("/api/status");
    return res.data;
  } catch (err: any) {
    const data: ErrorRejectedWithValue = {
      message: "Error fetching devices",
    };
    return rejectWithValue(data);
  }
});

export const updateDevice = createAsyncThunk("devices/switch-basic/publish", async (formData: PublishMessage, { rejectWithValue }) => {
  console.log(formData);

  try {
    const res = await axiosInstance.post("/user/publish", formData);
    return res.data;
  } catch (err: any) {
    const data: ErrorRejectedWithValue = {
      message: "Error updating device",
    };
    return rejectWithValue(data);
  }
});

export const deviceSlice = createSlice({
  name: "devices",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    getAllDevices;
    builder.addCase(getAllDevices.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getAllDevices.fulfilled, (state, action) => {
      state.status = "success";
      state.devices = action.payload.result;
    });
    builder.addCase(getAllDevices.rejected, (state, action) => {
      const data = action.payload as ErrorRejectedWithValue;
      state.status = "error";
      state.devices = [];
      state.error = data.message;
    });
    // builder.addCase(fetchDevices.pending, (state) => {
    //   state.devices = [];
    //   state.status = "loading";
    // });
    // builder.addCase(fetchDevices.fulfilled, (state, action) => {
    //   state.status = "success";
    //   state.devices = action.payload.result;
    // });

    // builder.addCase(fetchDevices.rejected, (state, action) => {
    //   const data = action.payload as ErrorRejectedWithValue;

    //   state.status = "error";
    //   state.devices = [];
    //   state.error = data.message;
    // });
  },
});

export default deviceSlice.reducer;
