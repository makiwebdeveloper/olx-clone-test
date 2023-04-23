import * as userActions from "./user/user.actions";
import { userSlice } from "./user/user.slice";

export const rootActions = {
  ...userActions,
  ...userSlice.actions,
};
