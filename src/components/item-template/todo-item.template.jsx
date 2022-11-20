import "./todo-item.template.styles.less";
import { useState, useCallback } from "react";
import axios from "axios";

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

  async function download(url, fileName) {
    const image = await fetch(url);
    const imageBlob = await image.blob();

    const imageUrl = URL.createObjectURL(imageBlob);

    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

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
                  <li key={Math.random() * 123123}>
                    Link for <b style={{ fontSize: "18px" }}>{fileName}</b>:{" "}
                    <button onClick={(e) => download(url, fileName)}> Download </button>
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
