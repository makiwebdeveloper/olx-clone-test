import axios from "axios";
import { errorCatch, getContentType } from "./api.helper";
import StorageService from "@/services/storage.service";
import AuthService from "@/services/auth.service";

const $api = axios.create({
  baseURL: process.env.SERVER_URL,
  headers: getContentType(),
});

$api.interceptors.request.use((config) => {
  const accessToken = StorageService.getAccessToken();

  if (config.headers && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

$api.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;

    if (
      (error.response.status === 401 ||
        errorCatch(error) === "jwt expired" ||
        errorCatch(error) === "jwt must be provided") &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        await AuthService.getNewTokens();
        return $api.request(originalRequest);
      } catch (error) {
        if (errorCatch(error) === "jwt expired") {
          StorageService.removeData();
        }
      }
    }
  }
);

export default $api;
