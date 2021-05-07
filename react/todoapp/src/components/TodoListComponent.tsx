import axios from "axios";
import React, { FunctionComponent, useEffect, useState } from "react";
import { Todo } from "../interfaces/todo";
import { TodoItemComponent } from "./TodoItemComponent";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { TodoVal } from "../actions/register";

toast.configure();

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    gridItem: {
      marginRight: "10%",
    },
  })
);

interface Props {
  userEmail: String;
}
export const TodoListComponent: FunctionComponent<Props> = (props) => {
  const classes = useStyles();
  const [todosList, setTodosList] = useState<Todo[]>([]);
  const [isDeleted, setisDeleted] = useState<Boolean>(false);
  const [isUpdated, setisUpated] = useState<Boolean>(false);
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };

  const val = useSelector((state: TodoVal) => state);
  useEffect(() => {
    let todoArray: Todo[] = [];
    console.log(props.userEmail);
    axios.get("/users/getTodos", { headers: headers }).then((res) => {
      let temp_arr: any[] = res.data;
      temp_arr.map((todo) => {
        todoArray.push({
          id: todo._id,
          description: todo.description,
          title: todo.title,
        });
      });
      setTodosList(todoArray);
      if (isDeleted) {
        toastDelete();
      }
      if (isUpdated) {
        toastUpdate();
      }
      setisDeleted(false);
      setisUpated(false);
    });
  }, [props.userEmail, isDeleted, isUpdated, val]);

  const removeTodo = (todoId: String) => {
    axios.delete("/users/" + todoId, { headers: headers }).then((res) => {
      setisDeleted(true);
    });
  };

  const updateTodo = (todo: Todo) => {
    console.log(todo);
    axios.post("/users/updateTodo", todo, { headers: headers }).then((res) => {
      console.log(res.data);
      setisUpated(true);
    });
  };

  const toastUpdate = () => {
    toast.info("Updated Successfully", { autoClose: 3000 });
  };
  const toastDelete = () => {
    toast.warn("Deleted Successfully", { autoClose: 3000 });
  };
  return (
    <div>
      <h4>All TodoLists</h4>
      <div className={classes.root}>
        <Grid container spacing={1} style={{ gap: 5 }}>
          {todosList.map((todo) => {
            return (
              <Grid
                item
                xs={3}
                key={todo.id.toString()}
                className={classes.gridItem}
              >
                <TodoItemComponent
                  todo={todo}
                  removeTodo={removeTodo}
                  updateTodo={updateTodo}
                />
              </Grid>
            );
          })}
        </Grid>
      </div>
    </div>
  );
};
