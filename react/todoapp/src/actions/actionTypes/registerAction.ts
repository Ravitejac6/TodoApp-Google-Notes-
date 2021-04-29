import { UserLoginModel } from "../../interfaces/userLoginModel";
import { UserRegisterModel } from "../../interfaces/userRegisterModel";

export type SetRegisterAction = {
  type: "REGISTER_USER";
  payload: UserRegisterModel;
};

export type SetLoginAction = {
  type: "LOGIN_USER";
  payload: UserLoginModel;
};
