import axios from "axios";
import React, { FunctionComponent, useEffect, useState } from "react";
import { Todo } from "../interfaces/todo";
import { TodoItemComponent } from "./TodoItemComponent";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
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
  useEffect(() => {
    let todoArray: Todo[] = [];
    console.log(props.userEmail);
    axios.get("/users/getTodos/" + props.userEmail).then((res) => {
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
      setisDeleted(false);
      setisUpated(false);
    });
  }, [props.userEmail, isDeleted, isUpdated]);

  const removeTodo = (todoId: String) => {
    axios.delete("/users/" + todoId).then((res) => {
      console.log(res.data);
      setisDeleted(true);
    });
  };

  const updateTodo = (todo: Todo) => {
    console.log(todo);
    axios.post("/users/updateTodo", todo).then((res) => {
      console.log(res.data);
      setisUpated(true);
    });
  };

  const toastDelete = () => {
    toast.warn("Deleted Successfully", { autoClose: 3000 });
  };
  return (
    <div>
      <h4>All TodoLists</h4>
      <div className={classes.root}>
        <Grid container spacing={3}>
          {todosList.map((todo) => {
            return (
              <Grid item xs key={todo.id.toString()}>
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
