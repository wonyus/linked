import { getCsrfToken } from "next-auth/react";

import { axiosDefault } from "./axios";

export const fetchSession = async () => {
  // console.log("fectSession");
  const session = await fetch("/api/auth/session");
  return session;
};

export const updateSession = async (newSession: Record<string, any>) => {
  // console.log("updateSession");

  await fetch(`/api/auth/session`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      csrfToken: await getCsrfToken(),
      data: newSession,
    }),
  });
};

export const getRefreshToken = async (refreshToken: string) => {
  // console.log("getRefreshToken", refreshToken);
  const res = await axiosDefault.post(
    `/user/refresh`,
    {},
    {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${refreshToken}`,
      },
    }
  );
  const data = await res.data;
  return data;
};
