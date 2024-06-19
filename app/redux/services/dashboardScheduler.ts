// src/redux/services/dashboardSchedul.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const dashboardSchedulerApi = createApi({
  reducerPath: 'dashboardSchedulerApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5126' }),
  endpoints: (builder) => ({
    getAllDashboardScheduler: builder.query({
      query: () => '/api/TestApi',
    }),
  }),
});

export const { useGetAllDashboardSchedulerQuery } = dashboardSchedulerApi;
