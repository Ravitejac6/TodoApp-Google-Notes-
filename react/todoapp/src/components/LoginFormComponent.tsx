import React, { useState, useEffect } from "react";
import { Button, TextField } from "@material-ui/core";
import { UserLoginModel } from "../interfaces/userLoginModel";
import { useDispatch } from "react-redux";
import { setLogin } from "../actions/register";
import { useHistory } from "react-router-dom";
import axios from "axios";

export const LoginFormComponent = () => {
  let initialUserLogin: UserLoginModel = {
    email: "",
    password: "",
  };

  const [userLogin, setUserLogin] = useState<UserLoginModel>(initialUserLogin);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleUserLogin = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setUserLogin({
      ...userLogin,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    dispatch(setLogin(userLogin));
    setTimeout(() => {
      history.push("/users/view");
    }, 1000);
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={handleSubmit} autoComplete="off">
        <TextField
          name="email"
          label="Email"
          onChange={(e) => handleUserLogin(e)}
        />
        <TextField
          name="password"
          label="Password"
          type="password"
          onChange={(e) => handleUserLogin(e)}
        />
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};
