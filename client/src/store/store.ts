import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { userSlice } from "./user/user.slice";
import { paginationSlice } from "./pagination/pagination.slice";

const rootReducer = combineReducers({
  user: userSlice.reducer,
  pagination: paginationSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootStateType = ReturnType<typeof rootReducer>;
