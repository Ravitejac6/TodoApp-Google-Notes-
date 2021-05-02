import axios from "axios";
import React, { useEffect, useState } from "react";
import { Todo } from "../interfaces/todo";
import { TodoItemComponent } from "./TodoItemComponent";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
  })
);

export const TodoListComponent = () => {
  const classes = useStyles();
  const [todosList, setTodosList] = useState<Todo[]>([]);
  useEffect(() => {
    let todoArray: Todo[] = [];
    axios.get("/users/getTodos/ravi@gmail.com").then((res) => {
      let temp_arr: any[] = res.data;
      temp_arr.map((todo) => {
        todoArray.push({
          id: todo._id,
          description: todo.description,
          title: todo.title,
        });
      });
      setTodosList(todoArray);
    });
  }, []);
  return (
    <div>
      <h4>TodoList Component</h4>
      <div className={classes.root}>
        <Grid container spacing={3}>
          {todosList.map((todo) => {
            return (
              <Grid item xs key={todo.id.toString()}>
                <TodoItemComponent todo={todo} />
              </Grid>
            );
          })}
        </Grid>
      </div>
    </div>
  );
};
