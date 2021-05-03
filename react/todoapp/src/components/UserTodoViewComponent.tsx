import React, { useEffect, useState } from "react";
import { TodoFormComponent } from "./TodoFormComponent";
import { TodoListComponent } from "./TodoListComponent";
import axios from "axios";
import { Button } from "@material-ui/core";
import "../App.css";
import { useHistory } from "react-router-dom";

export const UserTodoViewComponent = () => {
  const [userEmail, setUserEmail] = useState<String>("");
  useEffect(() => {
    axios
      .get("/users/user")
      .then((res) => {
        setLogIn(true);
        console.log(res.data);
        setUserEmail(res.data.email);
        console.log(userEmail);
      })
      .catch((err) => {
        setLogIn(false);
        history.push("/users/login");
      });
  }, []);

  const history = useHistory();
  const [logIn, setLogIn] = useState<Boolean>(false);
  const logOut = () => {
    axios.post("/users/logout").then((res) => console.log(res));
    setTimeout(() => {
      history.push("/users/login");
    }, 500);
  };
  return (
    <div>
      {logIn && userEmail !== "" ? (
        <div>
          <Button
            className="btn-logOut"
            variant="contained"
            color="secondary"
            onClick={logOut}
          >
            LogOut
          </Button>
          <TodoFormComponent userEmail={userEmail} />
          <TodoListComponent userEmail={userEmail} />
        </div>
      ) : (
        <div>
          <h3>Not logged in</h3>
        </div>
      )}
    </div>
  );
};
