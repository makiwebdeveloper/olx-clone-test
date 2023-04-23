import { RootStateType } from "@/store/store";
import { TypedUseSelectorHook, useSelector } from "react-redux";

export const useTypedSelector: TypedUseSelectorHook<RootStateType> =
  useSelector;
