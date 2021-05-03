import {
  Button,
  TextField,
  Card,
  CardContent,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { UserRegisterModel } from "../interfaces/userRegisterModel";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setRegister } from "../actions/register";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "40%",
      margin: "30px",
      marginLeft: "100px",
    },
    textField: {
      margin: theme.spacing(1),
      width: "50ch",
    },
    card: {
      width: "60%",
      height: "25%",
      marginLeft: "100px",
    },
    button: {
      alignItems: "center",
      marginLeft: "150px",
      marginTop: "20px",
    },
    title: {
      marginLeft: "10px",
    },
  })
);
export const RegisterFormComponent = () => {
  const classes = useStyles();
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
    toastSuccess();
    setTimeout(() => {
      history.push("/users/login");
    }, 500);
  };

  const toastSuccess = () => {
    toast.success("Successfully Logged In", { autoClose: 3000 });
  };
  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography
            color="textPrimary"
            variant="h5"
            className={classes.title}
          >
            Register
          </Typography>
          <form
            onSubmit={handleSubmit}
            autoComplete="off"
            className={classes.root}
          >
            <TextField
              name="userName"
              label="UserName"
              onChange={(e) => handleUserRegister(e)}
              className={classes.textField}
              required={true}
            />
            <TextField
              name="email"
              label="Email"
              onChange={(e) => handleUserRegister(e)}
              className={classes.textField}
              required={true}
            />
            <TextField
              name="password"
              label="Password"
              type="password"
              onChange={(e) => handleUserRegister(e)}
              className={classes.textField}
              required={true}
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className={classes.button}
            >
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
