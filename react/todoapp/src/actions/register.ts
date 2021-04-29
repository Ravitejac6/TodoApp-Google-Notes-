import { UserLoginModel } from "../interfaces/userLoginModel";
import { UserRegisterModel } from "../interfaces/userRegisterModel";
import {
  SetLoginAction,
  SetRegisterAction,
} from "./actionTypes/registerAction";
export const setRegister = (user: UserRegisterModel): SetRegisterAction => ({
  type: "REGISTER_USER",
  payload: user,
});

export const setLogin = (user: UserLoginModel): SetLoginAction => ({
  type: "LOGIN_USER",
  payload: user,
});
