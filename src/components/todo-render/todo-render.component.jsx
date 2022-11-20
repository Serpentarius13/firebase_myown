import { useEffect, useState } from "react";
import { getAllTodos } from "../../utils/firebase.util";
import TodoItem from "../todo-item/todo-item.component";
import "./todo-render.component.less";

const TodoRender = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getAllTodos().then((res) => {
      setTodos(res);
    });
  }, []);

  console.log(todos);

  return (
    <div>
      {todos &&
        todos.map((item) => {
          return <TodoItem item={item} />
        })}
    </div>
  );
};

export default TodoRender;
