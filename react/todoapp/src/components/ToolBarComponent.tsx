import React from "react";
import { Toolbar, Typography, AppBar, IconButton } from "@material-ui/core";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
export const ToolBarComponent = () => {
  const history = useHistory();

  const logOut = () => {
    axios.post("/users/logout").then((res) => {
      console.log(res);
      localStorage.removeItem("token");
    });
    setTimeout(() => {
      history.push("/users/login");
    }, 500);
    toastLogOut();
  };

  const toastLogOut = () => {
    toast.info("User Logged Out", { autoClose: 3000 });
  };
  return (
    <AppBar color="primary">
      <Toolbar>
        <Typography variant="h6">TODO App</Typography>
        <span style={{ marginLeft: "90%" }}>
          <IconButton onClick={logOut}>
            <AccountCircleIcon fontSize="inherit" />
          </IconButton>
        </span>
      </Toolbar>
    </AppBar>
  );
};
