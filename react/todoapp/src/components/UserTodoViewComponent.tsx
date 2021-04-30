import React from "react";
import { TodoFormComponent } from "./TodoFormComponent";
import { TodoListComponent } from "./TodoListComponent";

export const UserTodoViewComponent = () => {
  return (
    <div>
      <TodoFormComponent />
      <TodoListComponent />
    </div>
  );
};
