import "./file-list.styles.less";
import { updateTodoFirebase } from "../../utils/firebase.util";
import { useState, useContext } from "react";
import { StateContext } from "../../context/state.context";


/**
 * A component to render list of Files attached to a todo
 * 
 * @param {Array} docs List of files itself
 * @param {*} item for updating the document
 * @returns Unordered list of items with two buttons in each <li> element
 */
const FileList = ({ docs, item }) => {
  const { name, description, deadline, deleteTodo, updateTodo, completed, id } =
    item;

  const { fetcher } = useContext(StateContext);

  /**
   * This thing is a very genius of human thought and creativeness. It downloads the file from provided url as provided fileName.
   *
   * @param {string} url - url of Firestorage item location
   * @param {string} fileName - name that will be used to name the downloaded file
   * @returns Downloaded file to your computer
   */
  const download = async (url, fileName) => {
    const image = await fetch(url);
    const imageBlob = await image.blob();

    const imageUrl = URL.createObjectURL(imageBlob);

    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  /**
   * Deletes file from todo but not from storage. Because storage doesn't hold any duplicates, it is almost impossible to delete file just from one single todo and not hurt others that may posses the same file
   *
   * @param {*} fileName - Name of file to be deleted
   */
  const removeFile = async (fileName) => {
    try {
      docs = docs.filter((doc) => doc.fileName !== fileName);

      const obj = { name, description, deadline, completed, docs };

      await updateTodoFirebase(id, obj);
      fetcher();
    } catch (err) {
      console.log(err);
      alert("Error deleting file");
    }
  };

  return (
    <ul className="file-list">
      {" "}
      {docs.length > 0
        ? docs.map(({ url, fileName }) => (
            <li key={Math.random() * 123123}>
              <b style={{ fontSize: "18px" }}>{fileName}</b>:{" "}
              <div className="list-btns">
                <button type="click" onClick={(e) => download(url, fileName)}>
                  {" "}
                  Download{" "}
                </button>
                <button
                  type="click"
                  className="file-delete-btn"
                  onClick={(e) => removeFile(fileName)}
                >
                  {" "}
                  Delete{" "}
                </button>
              </div>
            </li>
          ))
        : ""}
    </ul>
  );
};

export default FileList;
