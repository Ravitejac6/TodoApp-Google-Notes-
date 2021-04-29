import { ThunkAction, Action, createStore } from "@reduxjs/toolkit";
import { registerReducer } from "../reducers/registerReducer";

export const store = createStore(registerReducer);

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
