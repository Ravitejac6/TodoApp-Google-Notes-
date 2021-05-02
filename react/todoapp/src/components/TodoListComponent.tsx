import axios from "axios";
import React, { useEffect } from "react";
import { Todo } from "../interfaces/todo";
import { TodoItemComponent } from "./TodoItemComponent";

export const TodoListComponent = () => {
  let todoArray: Todo[] = [];
  useEffect(() => {
    axios.get("/users/getTodos").then((res) => console.log(res.data));
  });
  return (
    <div>
      <h4>TodoList Component</h4>
      <TodoItemComponent />
    </div>
  );
};
