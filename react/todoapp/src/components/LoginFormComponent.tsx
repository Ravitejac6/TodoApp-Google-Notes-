import React, { useState } from "react";
import {
  Button,
  TextField,
  Card,
  CardContent,
  Typography,
} from "@material-ui/core";
import { UserLoginModel } from "../interfaces/userLoginModel";
import { useDispatch } from "react-redux";
import { setLogin } from "../actions/register";
import { useHistory } from "react-router-dom";
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

export const LoginFormComponent = () => {
  const classes = useStyles();
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
    e.preventDefault();
    dispatch(setLogin(userLogin));
    setTimeout(() => {
      history.push("/users/view");
    }, 1000);
    toastSuccess();
  };

  const toastSuccess = () => {
    toast.success("Successfully Logged In", { autoClose: 3000 });
  };

  const toastWarning = () => {
    toast.warning("Wrong Credentials", { autoClose: 3000 });
  };

  const goToRegister = () => {
    history.push("/users/create");
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
            Login
          </Typography>
          <form
            onSubmit={handleSubmit}
            autoComplete="off"
            className={classes.root}
          >
            <TextField
              name="email"
              label="Email"
              onChange={(e) => handleUserLogin(e)}
              className={classes.textField}
              required={true}
            />
            <TextField
              name="password"
              label="Password"
              type="password"
              className={classes.textField}
              onChange={(e) => handleUserLogin(e)}
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
            <Button
              variant="contained"
              color="secondary"
              onClick={goToRegister}
              className={classes.button}
            >
              Register
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
