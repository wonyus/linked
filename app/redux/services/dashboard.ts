import { IDashboardResponse } from "@App/home/dashboard";
import { fetchSession, getNewAccessToken, updateSession } from "@App/http/axiosAuth";
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

export const dashboardApi = createApi({
  reducerPath: "DashboardApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Dashboard"],
  endpoints: (builder) => ({
    getAllDashboard: builder.query<IDashboardResponse,void>({
      query: () => ({
        url: "/user/get_dashboard",
        method: "GET",
      }),
    }),
  }),
});

// Export hooks for usage in functional components
export const {useGetAllDashboardQuery} = dashboardApi;
