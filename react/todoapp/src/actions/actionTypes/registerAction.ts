import { UserLoginModel } from "../../interfaces/userLoginModel";
import { UserRegisterModel } from "../../interfaces/userRegisterModel";
import { TodoVal } from "../register";

export type SetRegisterAction = {
  type: "REGISTER_USER";
  payload: UserRegisterModel;
};

export type SetLoginAction = {
  type: "LOGIN_USER";
  payload: UserLoginModel;
};

export type addTodoAction = {
  type: "todo/add";
  payload: TodoVal;
};
