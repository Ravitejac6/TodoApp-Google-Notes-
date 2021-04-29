import React from "react";
import "./App.css";
import { LoginFormComponent } from "./components/LoginFormComponent";
import { RegisterFormComponent } from "./components/RegisterFormComponent";
import { ToolBarComponent } from "./components/ToolBarComponent";

function App() {
  return (
    <div className="App">
      <ToolBarComponent />
      <h4>Hello Ravi!</h4>
      <RegisterFormComponent />
      <LoginFormComponent />
    </div>
  );
}

export default App;
