import { useCallback, useEffect, useState } from "react";
import "./todo-item.style.less";
import { getFileUrl, removeTodo } from "../../utils/firebase.util";
import FormComponent from "../todo-form/form.component";
import FileLinksBox from "../file-links-box/file-links-box.component";
import TodoItemTemplate from "../item-template/todo-item.template";

const TodosContainer = ({ item }) => {
  const { name, description, deadline, docs } = item.data();
  const { id } = item;
  const [date, time] = deadline.split(" ");


  const [editing, setEditing] = useState(false);

  const checkDeadline = useCallback(() => {
    const checkDate = new Date().getTime() <= new Date(deadline).getTime()

    if (!checkDate) return false;

    return true;
  }, []);

  const deleteTodo = useCallback(async () => {
    try {
      console.log('Deleting')
      await removeTodo(id);
      alert('Deleted')
      location.reload()
    } catch (err) {
      console.log(err);
    }
  }, []);

  const updateTodo = () => {
    setEditing(true);
  };

  const props = { name, description, deadline, deleteTodo, updateTodo, docs };

  return (
    <div className="grid">
      {editing ? (
        <FormComponent item={{ name, description, time, date, id, docs }} />
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
