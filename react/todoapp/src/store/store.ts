import {
  ThunkAction,
  Action,
  createStore,
  combineReducers,
} from "@reduxjs/toolkit";
import { registerReducer } from "../reducers/registerReducer";
import { loginReducer } from "../reducers/loginReducer";

const reducers = combineReducers({ registerReducer, loginReducer });
export const store = createStore(reducers);

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
