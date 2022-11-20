import { useState } from "react";
import "./App.css";
import TodoItemTemplate from "./components/item-template/todo-item.template";
import FormComponent from "./components/todo-form/form.component";
import TodoRender from "./components/todo-render/todo-render.component";


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
