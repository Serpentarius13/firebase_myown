import { useEffect, useState } from "react";
import { getAllTodos } from "../../utils/firebase.util";
import TodoItem from "../todo-item/todo-item.component";
import "./todo-render.styles.less";

const TodoRender = ({todos}) => {


  return (
    <div className="todoshka">
    <h1> Todo list </h1>
      <div className="todos-rendered">
        {todos &&
          todos.map((item) => {
            return <TodoItem key={Math.random() * 1213123} item={item} />;
          })}
      </div>
    </div>
  );
};

export default TodoRender;
