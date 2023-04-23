import { errorCatch } from "@/api/api.helper";
import { IAuthResponse, IEmailPassword } from "@/interfaces/auth.interface";
import AuthService from "@/services/auth.service";
import StorageService from "@/services/storage.service";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const registration = createAsyncThunk<IAuthResponse, IEmailPassword>(
  "auth/registration",
  async (data, thunkApi) => {
    try {
      const response = await AuthService.registration(data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const login = createAsyncThunk<IAuthResponse, IEmailPassword>(
  "auth/login",
  async (data, thunkApi) => {
    try {
      const response = await AuthService.login(data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", () => {
  StorageService.removeData();
});

export const checkAuth = createAsyncThunk<IAuthResponse>(
  "auth/check-auth",
  async (_, thunkApi) => {
    try {
      const response = await AuthService.getNewTokens();
      return response;
    } catch (error) {
      if (errorCatch(error) === "jwt expired") {
        thunkApi.dispatch(logout);
      }

      return thunkApi.rejectWithValue(error);
    }
  }
);
