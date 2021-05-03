import React, { useState } from "react";
import { Button, TextField, Card, CardContent } from "@material-ui/core";
import { UserLoginModel } from "../interfaces/userLoginModel";
import { useDispatch } from "react-redux";
import { setLogin } from "../actions/register";
import { useHistory } from "react-router-dom";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

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
    dispatch(setLogin(userLogin));
    setTimeout(() => {
      history.push("/users/view");
    }, 1000);
    e.preventDefault();
  };

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
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
            />
            <TextField
              name="password"
              label="Password"
              type="password"
              className={classes.textField}
              onChange={(e) => handleUserLogin(e)}
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
