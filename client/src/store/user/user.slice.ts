import { IUser } from "@/interfaces/user.interface";
import { getFromLocalStorage } from "@/utils/get-from-storage";
import { createSlice } from "@reduxjs/toolkit";
import { checkAuth, login, logout, registration } from "./user.actions";

interface IUserState {
  user: IUser | null;
  isLoading: boolean;
  error: any;
}

const initialState: IUserState = {
  user: getFromLocalStorage("user"),
  isLoading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: { payload: IUser | null }) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // REGISTRATION
      .addCase(registration.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registration.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.user = action.payload.user;
      })
      .addCase(registration.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action;
      })
      // LOGIN
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action;
      })
      // LOGOUT
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.error = null;
      })
      // CHECK USER
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.user = action.payload.user;
      });
  },
});
