import { useState } from "react";
import "./App.css";
import FormComponent from "./components/todo-form/form.component";
import TodoRender from "./components/todo-render/todo-render.component";
import FileForm from "./components/file-form/file-form.component";

function App() {
  return (
    <>
      {" "}
      <FormComponent> </FormComponent>
      <TodoRender></TodoRender>
    </>
  );
}

export default App;
