import { UserLoginModel } from "../interfaces/userLoginModel";
import { UserRegisterModel } from "../interfaces/userRegisterModel";
import {
  addTodoAction,
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

export interface TodoVal {
  value: number;
}
export const addTodo = (value: TodoVal): addTodoAction => ({
  type: "todo/add",
  payload: value,
});
