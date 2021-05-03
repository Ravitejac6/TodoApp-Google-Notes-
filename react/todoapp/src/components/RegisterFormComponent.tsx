import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { UserRegisterModel } from "../interfaces/userRegisterModel";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setRegister } from "../actions/register";

export const RegisterFormComponent = () => {
  let initialUserRegister: UserRegisterModel = {
    userName: "",
    email: "",
    password: "",
  };
  const [userRegister, setUserRegister] = useState<UserRegisterModel>(
    initialUserRegister
  );

  const history = useHistory();
  const dispatch = useDispatch();
  const handleUserRegister = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setUserRegister({
      ...userRegister,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(userRegister);
    dispatch(setRegister(userRegister));
    setTimeout(() => {
      history.push("/users/login");
    }, 500);
  };
  return (
    <div>
      <form onSubmit={handleSubmit} autoComplete="off">
        <TextField
          name="userName"
          label="UserName"
          onChange={(e) => handleUserRegister(e)}
        />
        <TextField
          name="email"
          label="Email"
          onChange={(e) => handleUserRegister(e)}
        />
        <TextField
          name="password"
          label="Password"
          type="password"
          onChange={(e) => handleUserRegister(e)}
        />
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};
