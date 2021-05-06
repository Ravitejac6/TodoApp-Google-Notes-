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
      // width: "40%",
      margin: "10px",
      marginLeft: "30px",
    },
    textField: {
      // margin: theme.spacing(1),
      // width: "50ch",
      margin: theme.spacing(0.5),
      width: "60ch",
      display: "flex",
      flexDirection: "column",
    },
    card: {
      width: "600px",
      height: "300px",
      marginLeft: "100px",
      boxShadow: "0 1px 7px rgb(128,128,128)",
    },
    cardContent: {
      display: "flex",
      flexWrap: "wrap",
      flexDirection: "column",
      flex: "1 1 auto",
    },
    button: {
      alignItems: "center",
      marginLeft: "150px",
      marginTop: "20px",
      display: "flex",
      flexDirection: "column",
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
      const token = localStorage.getItem("token");
      if (!token) {
        toastWarning();
      } else {
        history.push("/users/view");
        toastSuccess();
      }
    }, 2000);
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
    <div className="shadow-area">
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
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
