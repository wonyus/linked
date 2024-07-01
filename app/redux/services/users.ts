
import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQueryWithReauth } from "./devices";
import { ChangePassword } from "@Interface/ChangePassword/ChangePassword";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    changePassword: builder.mutation<any, ChangePassword>({
      query: (body) => ({
        url: "/user/change_password",
        method: "POST",
        body: body,
        invalidatesTags: ["Users"],
      }),
    }),
  }),
});

// Export hooks for usage in functional components
export const { useChangePasswordMutation } = usersApi;
