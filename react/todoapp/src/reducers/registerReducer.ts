import { SetRegisterAction } from "../actions/actionTypes/registerAction";
import { UserRegisterModel } from "../interfaces/userRegisterModel";
import axios from "axios";

const intialUserRegister: UserRegisterModel = {
  userName: "",
  email: "",
  password: "",
};

const postRequestData = (data: UserRegisterModel) => {
  axios.post("/users/create", data);
};
const setRegisterFormReducer = (
  state: UserRegisterModel,
  action: SetRegisterAction
) => {
  console.log(action.payload);
  postRequestData(action.payload);
  return {
    ...state,
    userName: action.payload.userName,
    email: action.payload.email,
    password: action.payload.password,
  };
};
export const registerReducer = (
  state: UserRegisterModel = intialUserRegister,
  action: SetRegisterAction
) => {
  switch (action.type) {
    case "REGISTER_USER": {
      return setRegisterFormReducer(state, action);
    }
    default:
      return state;
  }
};
