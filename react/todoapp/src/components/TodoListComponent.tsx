import axios from "axios";
import React, { FunctionComponent, useEffect, useState } from "react";
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

interface Props {
  userEmail: String;
}
export const TodoListComponent: FunctionComponent<Props> = (props) => {
  const classes = useStyles();
  const [todosList, setTodosList] = useState<Todo[]>([]);
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
    });
  }, [props.userEmail]);

  const removeTodo = (todoId: String) => {
    axios.delete("/users/" + todoId).then((res) => console.log(res.data));
  };
  return (
    <div>
      <h4>All TodoLists</h4>
      <div className={classes.root}>
        <Grid container spacing={3}>
          {todosList.map((todo) => {
            return (
              <Grid item xs key={todo.id.toString()}>
                <TodoItemComponent todo={todo} removeTodo={removeTodo} />
              </Grid>
            );
          })}
        </Grid>
      </div>
    </div>
  );
};
