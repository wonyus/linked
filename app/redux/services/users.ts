import { fetchSession, getNewAccessToken, updateSession } from "@App/http/axiosAuth";
import { IDeviceResponse } from "@Interface/Devices/Switch/BasicSwitch";
import { PublishMessage } from "@Interface/Mesages/Message";
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

import { baseQueryWithReauth } from "./devices";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    publish: builder.mutation<any, PublishMessage>({
      query: (body) => ({
        url: "/user/publish1",
        method: "POST",
        body: body,
      }),
    }),
  }),
});

// Export hooks for usage in functional components
export const {} = usersApi;
