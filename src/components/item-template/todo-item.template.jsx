import "./todo-item.template.styles.less";
import { useState, useCallback } from "react";

const TodoItemTemplate = ({ item }) => {
  const { name, description, deadline, deleteTodo, updateTodo, docs } = item;

  const [date, time] = deadline.split(" ");

  const [buttonText, setButtonText] = useState("Open file section");

  const [style, setStyle] = useState({
    visibility: 0,
    opacity: 0,
    display: "none",
  });

  const checkDeadline = useCallback(() => {
    const checkDate = new Date().getTime() <= new Date(deadline).getTime();

    if (!checkDate) return false;

    return true;
  }, []);

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
            <button onClick={deleteTodo} >
              {" "}
              Delete{" "}
            </button>
            <button onClick={updateTodo}>
              {" "}
              Update{" "}
            </button>
          </div>
        </div>

        <button className="open-files" onClick={handleFiles}>
          {buttonText}
        </button>

        <div
          className="deadline"
          style={
            checkDeadline() ? { borderColor: "green" } : { borderColor: "red" }
          }
        >
          {" "}
          {date} {time}{" "}
        </div>
        <div className="file-list" style={style}>
          <ul>
            {" "}
            {docs.length > 0
              ? docs.map(({ url, fileName }) => (
                  <li>
                    {" "}
                    Link for <b style={{fontSize: '24px'}}> {fileName} </b>:{" "}
                    <a href={url}> Click me! </a>{" "}
                  </li>
                ))
              : ""}
          </ul>
        </div>
      </div>
    </>
  );
};

export default TodoItemTemplate;
