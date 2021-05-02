import axios from "axios";
import React, { useEffect, useState } from "react";
import { Todo } from "../interfaces/todo";
import { TodoItemComponent } from "./TodoItemComponent";

export const TodoListComponent = () => {
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
      {todosList.map((todo) => {
        return <TodoItemComponent key={todo.title.toString()} todo={todo} />;
      })}
    </div>
  );
};
