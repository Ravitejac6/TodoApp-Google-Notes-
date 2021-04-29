import { UserRegisterModel } from "../interfaces/userRegisterModel";
import { SetRegisterAction } from "./actionTypes/registerAction";
export const setRegister = (user: UserRegisterModel): SetRegisterAction => ({
  type: "REGISTER_USER",
  payload: user,
});
