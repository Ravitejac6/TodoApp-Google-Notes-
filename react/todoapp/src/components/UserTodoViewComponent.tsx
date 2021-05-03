import React, { useEffect } from "react";
import { TodoFormComponent } from "./TodoFormComponent";
import { TodoListComponent } from "./TodoListComponent";
import axios from "axios";
import { Button } from "@material-ui/core";

export const UserTodoViewComponent = () => {
  useEffect(() => {
    axios.get("/users/user").then((res) => console.log(res.data));
  }, []);

  const logOut = () => {
    axios.post("/users/logout").then((res) => console.log(res));
  };
  return (
    <div>
      <Button variant="contained" color="secondary" onClick={logOut}>
        LogOut
      </Button>
      <TodoFormComponent />
      <TodoListComponent />
    </div>
  );
};
