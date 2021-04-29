import { SetLoginAction } from "../actions/actionTypes/registerAction";
import { UserLoginModel } from "../interfaces/userLoginModel";

const intialUserLogin: UserLoginModel = {
  email: "",
  password: "",
};

const setLoginFormReducer = (state: UserLoginModel, action: SetLoginAction) => {
  console.log(action.payload);
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
