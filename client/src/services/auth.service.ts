import { IAuthResponse, IEmailPassword } from "@/interfaces/auth.interface";
import axios from "axios";
import StorageService from "./storage.service";
import { getContentType } from "@/api/api.helper";

const path = "/auth";

const AuthService = {
  async registration(data: IEmailPassword) {
    const response = await axios<IAuthResponse>({
      url: `${process.env.SERVER_URL}${path}/registration`,
      method: "POST",
      data,
    });

    if (response.data.accessToken) StorageService.saveData(response.data);

    return response.data;
  },

  async login(data: IEmailPassword) {
    const response = await axios<IAuthResponse>({
      url: `${process.env.SERVER_URL}${path}/login`,
      method: "POST",
      data,
    });

    if (response.data.accessToken) StorageService.saveData(response.data);

    return response.data;
  },

  logout() {
    StorageService.removeData();
  },

  async getNewTokens() {
    const refreshToken = StorageService.getRefreshToken();

    const response = await axios<string, { data: IAuthResponse }>({
      url: `${process.env.SERVER_URL}${path}/tokens`,
      method: "POST",
      data: { refreshToken },
      headers: getContentType(),
    });

    if (response.data.accessToken) StorageService.saveData(response.data);

    return response.data;
  },
};

export default AuthService;
