import { SetLoginAction } from "../actions/actionTypes/registerAction";
import { UserLoginModel } from "../interfaces/userLoginModel";
import axios from "axios";

const intialUserLogin: UserLoginModel = {
  email: "",
  password: "",
};

const postLoginData = (userData: UserLoginModel) => {
  axios.post("/users/login", {
    email: userData.email,
    password: userData.password,
  });
};
const setLoginFormReducer = (state: UserLoginModel, action: SetLoginAction) => {
  console.log(action.payload);
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
