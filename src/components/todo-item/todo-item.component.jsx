import { useCallback, useEffect, useState } from "react";
import "./todo-item.style.less";
import { getFileUrl, removeTodo } from "../../utils/firebase.util";
import FormComponent from "../todo-form/form.component";
import FileForm from "../file-form/file-form.component";

const TodoItem = ({ item }) => {
  const { name, description, deadline, docs } = item.data();
  const { id } = item;
  const [date, time] = deadline.split(" ");

  console.log(deadline);
  console.log(date, time);

  const [editing, setEditing] = useState(false);

  const checkDeadline = useCallback(() => {
    const checkDate = new Date() < new Date(date);
    const checkTime = new Date().toTimeString().split(" ")[0] < time;

    if (!checkDate || (!checkDate && !checkTime)) return false;

    return true;
  }, []);

  const deleteTodo = useCallback(async () => {
    try {
      await removeTodo(id);
      console.log("deleted");
    } catch (err) {
      console.log(err);
    }
  }, []);

  const updateTodo = () => {
    setEditing(true);
  };

  return (
    <>
      {editing ? (
        <FormComponent item={{ name, description, time, date, id }} />
      ) : (
        <div className="todo-item-box">
          <p> {name} </p>
          <p> {description} </p>
          <p style={checkDeadline() ? { color: "green" } : { color: "red" }}>
            {deadline}
          </p>
          <button onClick={deleteTodo}> delete </button>
          <button onClick={updateTodo}> update todo</button>
          {docs.length > 0 ? (
            <div className="file-images">
              {" "}
              {docs.map(({ name, url }) => (
                <a target="_blank" key={Math.random() * 10000} href={url}>
                  {" "}
                  <img className="file-image" src={url} alt={name} />
                </a>
              ))}{" "}
            </div>
          ) : (
            ""
          )}
          <FileForm id={id}></FileForm>
        </div>
      )}
    </>
  );
};

export default TodoItem;
