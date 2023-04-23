import { IAuthResponse, ITokens, Tokens } from "@/interfaces/auth.interface";
import { IUser } from "@/interfaces/user.interface";
import { getFromLocalStorage } from "@/utils/get-from-storage";
import Cookies from "js-cookie";

const StorageService = {
  getAccessToken() {
    const accessToken = Cookies.get(Tokens.ACCESS_TOKEN);
    return accessToken || null;
  },

  getRefreshToken() {
    const refreshToken = Cookies.get(Tokens.REFRESH_TOKEN);
    return refreshToken || null;
  },

  saveTokens(data: ITokens) {
    Cookies.set(Tokens.ACCESS_TOKEN, data.accessToken);
    Cookies.set(Tokens.REFRESH_TOKEN, data.refreshToken);
  },

  getUser() {
    return getFromLocalStorage("user");
  },

  saveUser(user: IUser) {
    localStorage.setItem("user", JSON.stringify(user));
  },

  saveData(data: IAuthResponse) {
    const { user, ...tokens } = data;
    this.saveUser(user);
    this.saveTokens(tokens);
  },

  removeData() {
    Cookies.remove(Tokens.ACCESS_TOKEN);
    Cookies.remove(Tokens.REFRESH_TOKEN);
    localStorage.removeItem("user");
  },
};

export default StorageService;
