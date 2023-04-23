import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { userSlice } from "./user/user.slice";

const rootReducer = combineReducers({
  user: userSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootStateType = ReturnType<typeof rootReducer>;
