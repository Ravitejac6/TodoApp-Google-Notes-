import { UserRegisterModel } from "../../interfaces/userRegisterModel";

export type SetRegisterAction = {
  type: "REGISTER_USER";
  payload: UserRegisterModel;
};
