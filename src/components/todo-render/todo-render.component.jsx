import { useEffect, useState } from "react";
import { getAllTodos } from "../../utils/firebase.util";
import TodoItem from "../todo-item/todo-item.component";
import './todo-render.styles.less'

const TodoRender = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getAllTodos().then((res) => {
      setTodos(res);
    });
  }, []);

  console.log(todos);

  return (
    <div className="todos-rendered">
      {todos &&
        todos.map((item) => {
          return <TodoItem item={item} />
        })}
    </div>
  );
};

export default TodoRender;
