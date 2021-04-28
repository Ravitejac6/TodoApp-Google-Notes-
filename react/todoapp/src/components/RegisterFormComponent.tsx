import { Button, TextField } from "@material-ui/core";
import React, { ReactNodeArray, useState } from "react";
import { UserRegisterModel } from "../interfaces/userRegisterModel";

export const RegisterFormComponent = () => {
  let initialUserRegister: UserRegisterModel = {
    userName: "",
    email: "",
    password: "",
  };
  const [userRegister, setUserRegister] = useState<UserRegisterModel>(
    initialUserRegister
  );
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
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
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
          onChange={(e) => handleUserRegister(e)}
        />
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};
