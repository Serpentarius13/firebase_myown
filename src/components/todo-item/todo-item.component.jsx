import { useCallback, useEffect, useState } from "react";
import "./todo-item.style.less";
import { getFileUrl, removeTodo } from "../../utils/firebase.util";
import FormComponent from "../todo-form/form.component";

import TodoItemTemplate from "../item-template/todo-item.template";

/**
 * A component to render a single todo item
 *
 * @param {*} item - Firestore ref that is destructured with .data() and {id} later
 * @returns A single rendered todo item
 */
const TodosContainer = ({ item }) => {
  const { name, description, deadline, docs, completed } = item.data();
  const { id } = item;

  const [date, time] = deadline.split(" ");

  const [editing, setEditing] = useState(false);

  /**
   * Deletes current todo based on id provided in props's item
   */
  const deleteTodo = useCallback(async () => {
    try {
      console.log("Deleting");
      await removeTodo(id);
      alert("Deleted");
      location.reload();
    } catch (err) {
      console.log(err);
    }
  }, []);

  /**
   * Shows form instead of todo item to update it
   */
  const updateTodo = () => {
    setEditing(true);
  };

  const props = {
    name,
    description,
    deadline,
    deleteTodo,
    updateTodo,
    docs,
    completed,
  };

  return (
    <div className="grid">
      {editing ? (
        <FormComponent item={{ name, description, time, date, id, docs, completed }} />
      ) : (
        <TodoItemTemplate item={props}></TodoItemTemplate>
        // <div className="todo-item-box">
        //   <p> {name} </p>
        //   <p> {description} </p>
        //   <p style={checkDeadline() ? { color: "green" } : { color: "red" }}>
        //     {deadline}
        //   </p>
        //   <button onClick={deleteTodo}> delete </button>
        //   <button onClick={updateTodo}> update todo</button>
        //   {docs.length > 0 ? <FileLinksBox docs={docs} /> : ""}
        // </div>
      )}
    </div>
  );
};

export default TodosContainer;
