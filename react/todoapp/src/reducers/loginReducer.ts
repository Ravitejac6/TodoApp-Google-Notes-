import {
  addTodoAction,
  SetLoginAction,
} from "../actions/actionTypes/registerAction";
import { UserLoginModel } from "../interfaces/userLoginModel";
import axios from "axios";
import { TodoVal } from "../actions/register";

const intialUserLogin: UserLoginModel = {
  email: "",
  password: "",
};
export let errorMsg = false;

const saveTokenInLocalStorage = (data: any) => {
  const token = data.access_token;
  localStorage.setItem("token", JSON.stringify(token));
};
const postLoginData = (userData: UserLoginModel) => {
  axios
    .post("/users/login", {
      email: userData.email,
      password: userData.password,
    })
    .then((res) => {
      //console.log(res.data);
      saveTokenInLocalStorage(res.data);
      if (res.data.msg === "Wrong Credentials") {
        errorMsg = true;
      }
      console.log(errorMsg);
    })
    .catch((err) => {
      console.log(err);
    });
};
const setLoginFormReducer = (state: UserLoginModel, action: SetLoginAction) => {
  postLoginData(action.payload);
  return {
    ...state,
    email: action.payload.email,
    password: action.payload.password,
  };
};
export const loginReducer = (
  state: UserLoginModel = intialUserLogin,
  action: SetLoginAction
) => {
  switch (action.type) {
    case "LOGIN_USER": {
      return setLoginFormReducer(state, action);
    }
    default:
      return state;
  }
};

let initialVal: TodoVal = {
  value: 0,
};
export const addTodoReducer = (
  state: TodoVal = initialVal,
  action: addTodoAction
) => {
  switch (action.type) {
    case "todo/add": {
      return {
        ...state,
        value: state.value + 1,
      };
    }
    default:
      return state;
  }
};
