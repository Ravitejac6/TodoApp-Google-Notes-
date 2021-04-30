import React from "react";
import "./App.css";
import { LoginFormComponent } from "./components/LoginFormComponent";
import { RegisterFormComponent } from "./components/RegisterFormComponent";
import { ToolBarComponent } from "./components/ToolBarComponent";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserTodoViewComponent } from "./components/UserTodoViewComponent";

function App() {
  return (
    <div className="App">
      <ToolBarComponent />
      <Switch>
        <Route exact path="/">
          <Redirect to="/users/create" />
        </Route>
        <Route path="/users/create">
          <div className="form-area">
            <RegisterFormComponent />
          </div>
        </Route>
        <Route path="/users/login">
          <div className="form-area">
            <LoginFormComponent />
          </div>
        </Route>
        <Route path="/users/view">
          <div className="form-area">
            <UserTodoViewComponent />
          </div>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
