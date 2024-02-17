import axios from "axios";
import { fetchSession, getRefreshToken, updateSession } from "./axiosAuth";
const BASE_URL = "http://localhost:4000/v1";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    console.log(config.headers["Authorization"]);

    const session = await fetchSession();
    const data = await session.json();
    const accessToken = data.user.accessToken;
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  async function (response) {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Replace fectSession with your server-side equivalent to get the session
      const session = await fetchSession();
      const data = await session.json();

      // Replace getRefreshToken with your server-side equivalent to refresh the token
      const resData = await getRefreshToken(data.user.refreshToken);
      const accessToken = resData.result.accessToken;

      if (accessToken) {
        console.log("Access token refreshed!");

        // Update the server-side session with the new access token
        await updateSession({ user: { accessToken: resData.result.accessToken, refreshToken: resData.result.refreshToken } });

        // Set the new access token in the Axios instance headers
        axiosInstance.defaults.headers["Authorization"] = `Bearer ${accessToken}`;

        // Retry the original request with the new access token
        return axiosInstance(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

export const axiosDefault = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});
