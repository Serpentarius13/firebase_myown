import "./todo-item.template.styles.less";
import { useState, useCallback } from "react";
import FileList from "../item-list.component/file-list.component";

/**
 * A component that provides the template to render todo item
 *
 * @param {*} item - data to render todo item as a template
 * @returns Cool template of todo item
 */
const TodoItemTemplate = ({ item }) => {
  const { name, description, deadline, deleteTodo, updateTodo, completed, id } =
    item;

  let { docs } = item;

  const [date, time] = deadline.split(" ");

  const [buttonText, setButtonText] = useState("Open file section");

  const [style, setStyle] = useState({
    visibility: 0,
    opacity: 0,
    display: "none",
  });

  const [state, updState] = useState([]);

  /**
   * Boolean value to check if provided deadline in file is overdue or not (false - overdue, red; true - still intact, green)
   */
  const checkDeadline = completed
    ? true
    : new Date().getTime() <= new Date(deadline).getTime();

  /**
   * Turns and removes file list visibility (setting the state to opposite)
   */
  const handleFiles = () => {
    if (style.visibility === 0) setStyle({ visibility: 1, opacity: 1 });
    else setStyle({ visibility: 0, opacity: 0, display: "none" });

    if (buttonText === "Open file section") setButtonText("Close file section");
    else setButtonText("Open file section");
  };

  return (
    <>
      <div className="todo-item-box">
        <div className="todo-item-core">
          <h2> {name} </h2>
          <p> {description} lorem </p>
          <div className="buttons">
            <button onClick={deleteTodo}> Delete </button>
            <button onClick={updateTodo}> Update </button>
          </div>
        </div>

        <button className="open-files" onClick={handleFiles}>
          {buttonText}
        </button>

        <div
          className="deadline"
          style={
            checkDeadline ? { borderColor: "green" } : { borderColor: "red" }
          }
        >
          {" "}
          {completed
            ? "completed"
            : checkDeadline
            ? `${date} ${time}`
            : "failed"}{" "}
        </div>
        <div className="file-list" style={style}>
          <FileList docs={docs} item={item} state={updState} />
        </div>
      </div>
    </>
  );
};

export default TodoItemTemplate;
