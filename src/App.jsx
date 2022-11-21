import { useState, useEffect } from "react";
import "./App.less";
import TodoItemTemplate from "./components/item-template/todo-item.template";
import FormComponent from "./components/todo-form/form.component";
import TodoRender from "./components/todo-render/todo-render.component";

import { deleteAll } from "./utils/firebase.util";

import { getAllTodos } from "./utils/firebase.util";

import ModalPopup from "./components/modal-form/modal-form.component";
import { useContext } from "react";
import { StateContext } from "./context/state.context";

/**
 *
 * Attention! This code is very, very bad! I advise you not to look at the thing I did (which was harsh as the first time, but pretty satisfying, though my vision is going to be at least -10 by the end of this year, I might become a "software developer"!)
 */

function App() {
  const [modalState, setModalState] = useState(false);

  const { todos } = useContext(StateContext);
  return (
    <div className={modalState ? "window open" : "window"}>
      {" "}
      <TodoRender todos={todos}></TodoRender>
      <ModalPopup
        state={modalState}
        closeModal={() => {
          setModalState(false);
        }}
      >
        {" "}
      </ModalPopup>
      <button
        onClick={() => setModalState(!modalState)}
        className="create-todo"
      >
        {" "}
        Create todo{" "}
      </button>
      <button
        onClick={async () => {
          await deleteAll(todos);

          setTimeout(() => location.reload(), 1000);
        }}
        className="delete-all"
      >
        {" "}
        Delete all todos{" "}
      </button>
    </div>
  );
}

export default App;
