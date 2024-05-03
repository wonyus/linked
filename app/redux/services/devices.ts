import { fetchSession, getNewAccessToken, updateSession } from "@App/http/axiosAuth";
import { IAddDevice, IDevice, IDeviceResponse } from "@Interface/Devices/Switch/BasicSwitch";
import { PublishMessage } from "@Interface/Mesages/Message";
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.SERVER_URL,
  prepareHeaders: async (headers) => {
    const session = await getSession();
    if (session) {
      headers.set("Authorization", `Bearer ${session.user.accessToken}`);
      return headers;
    }
  },
});

export const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const session = await getSession();
    const refreshToken = session?.user?.refreshToken as string;
    const refreshResult = await getNewAccessToken(refreshToken);
    if (refreshResult) {
      await updateSession({ user: { accessToken: refreshResult.result.accessToken, refreshToken: refreshResult.result.refreshToken } });
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};

export const devicesApi = createApi({
  reducerPath: "devicesApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Devices"],
  endpoints: (builder) => ({
    createDevice: builder.mutation<any, IAddDevice>({
      query: (body: IAddDevice) => ({
        url: "/client/register_client",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Devices"],
    }),
    getAllDevices: builder.query<IDeviceResponse, void>({
      query: () => ({
        url: "/user/get_device_status",
        method: "GET",
      }),
      providesTags: ["Devices"],
    }),
    getDeviceById: builder.query({
      query: (name: string) => ``,
    }),
    updateDevice: builder.mutation<any, IDevice>({
      query: (body: IDevice) => ({
        url: "/device/switches/update",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Devices"],
    }),
    deleteDevice: builder.mutation<any, number>({
      query: (id: number) => ({
        url: `/client/delete`,
        method: "POST",
        body: { client_id: id },
      }),
      invalidatesTags: ["Devices"],
    }),
    publish: builder.mutation<any, PublishMessage>({
      query: (body) => ({
        url: "/user/publish",
        method: "POST",
        body: body,
      }),
    }),
  }),
});

// Export hooks for usage in functional components
export const { useCreateDeviceMutation, useGetAllDevicesQuery, useUpdateDeviceMutation, useDeleteDeviceMutation, usePublishMutation } = devicesApi;
