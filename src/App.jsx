import { useState, useEffect } from "react";
import "./App.less";
import TodoItemTemplate from "./components/item-template/todo-item.template";
import ModalPortal from "./components/modal-form/modal-form.portal";
import FormComponent from "./components/todo-form/form.component";
import TodoRender from "./components/todo-render/todo-render.component";

import { deleteAll } from "./utils/firebase.util";

import { getAllTodos } from "./utils/firebase.util";

function App() {
  const [modalState, setModalState] = useState(false);

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getAllTodos().then((res) => {
      setTodos(res);
    });
  }, []);
  return (
    <div className={modalState ? "window open" : "window"}>
      {" "}
      <TodoRender todos={todos}></TodoRender>
      <ModalPortal
        state={modalState}
        closeModal={() => {
          setModalState(false);
        }}
      >
        {" "}
      </ModalPortal>
      <button
        onClick={() => setModalState(!modalState)}
        className="create-todo"
      >
        {" "}
        Create todo{" "}
      </button>
      <button onClick={async () => await deleteAll(todos)} className="delete-all">
        {" "}
        Delete all todos{" "}
      </button>
    </div>
  );
}

export default App;
