import { IUser } from "./user.interface";

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export interface IAuthResponse extends ITokens {
  user: IUser;
}

export interface IEmailPassword {
  email: string;
  password: string;
}

export enum Tokens {
  ACCESS_TOKEN = "accessToken",
  REFRESH_TOKEN = "refreshToken",
}
