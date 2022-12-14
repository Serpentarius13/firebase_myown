import "./form.style.less";
import {
  addTodo,
  updateTodoFirebase,
  uploadFile,
  getFileUrl,
} from "../../utils/firebase.util";
import { useContext, useState } from "react";

import FileList from "../item-list.component/file-list.component";
import { StateContext } from "../../context/state.context";

const TodoForm = {
  name: "",
  description: "",
  date: "",
  time: "",
  docs: [],
  completed: false,
};

/**
 * A component with Form for interacting with Google Firebase to create todos
 *
 * @param item - If that parameter is provided, this component is executed for updating, default: 'null'
 * @returns {*} Form component for creating/updating todo items
 */
const FormComponent = ({ item = null }) => {
  const [formState, setFormState] = useState(item || TodoForm);

  const { name, description, date, time, docs, completed } = formState;

  const buttonText = item ? "Update todo" : "Add todo";
  const checkBoxText = completed ? "Uncomplete" : "Complete";

  const { fetcher } = useContext(StateContext);

  /**
   * Main handler for form. It performs create/update operation
   *
   * @param {*} event - Event to stop window reloading
   */
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const deadline = `${date} ${time}`;
    if (new Date(deadline) < new Date()) {
      alert("No deadlines for the past!");
      return;
    }

    const todo = { name, description, deadline, docs, completed };

    if (!item) {
      try {
        console.log("Submitting");
        await addTodo(todo);
        alert("Submitted!");
        fetcher();
        setFormState(TodoForm);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const { id } = formState;
        console.log("Updating");
        await updateTodoFirebase(id, todo);
        alert("Updated!");
        fetcher();
      } catch (err) {
        console.log(err);
      }
    }
  };

  /**
   * Generalized input handler that works with name and value property of each input to update state accordingly
   *
   * @param {*} event - Input onChange event
   */
  const onChangeHandler = (event) => {
    const { name, value } = event.target;

    setFormState({ ...formState, [name]: value });
  };

  /**
   * Submit handler for files. Checks if there's file, if todo already has this file (checks by fileName). If not, uploads file and updates state with new object {fileName, url}
   *
   * @param {*} event - FileInput onChange event
   *
   */
  const submitFileHandler = async (event) => {
    event.preventDefault();

    const file = event.target[0].files[0];

    if (!file) {
      alert("Load it first!");
      return;
    }

    const fileName = file.name;
    console.log(fileName);
    for (let i = 0; i < docs.length; i++) {
      if (docs[i].fileName === fileName) {
        alert("You already have him");
        return;
      }
    }

    console.log(docs);
    const url = await uploadFile(file).then(async (_) => {
      return await getFileUrl(fileName);
    });

    console.log(url);

    setFormState({ ...formState, docs: [...docs, { fileName, url }] });
  };

  /**
   * Changes value of completion to the opposite as checkbox clicks
   *
   * @param {*} event Accepts checkbox change just for the sake of it
   */
  const onCheckbox = (event) => {
    setFormState({ ...formState, completed: !completed });
  };

  return (
    <div className="form-send">
      <form onSubmit={onSubmitHandler}>
        <input
          type="text"
          name="name"
          value={name}
          placeholder="Todo name"
          required
          onChange={onChangeHandler}
        />
        <textarea
          name="description"
          value={description}
          placeholder="Todo description"
          required
          onChange={onChangeHandler}
        />
        <input
          type="date"
          name="date"
          value={date}
          placeholder="Deadline date"
          required
          onChange={onChangeHandler}
        />
        <input
          type="time"
          name="time"
          value={time}
          placeholder="Deadline time"
          required
          onChange={onChangeHandler}
        />

        <button type="submit"> {buttonText} </button>
      </form>

      <div className="checkbox-box">
        {" "}
        <button type="click" className="checkbox" onClick={onCheckbox}>
          {" "}
          {checkBoxText}{" "}
        </button>
      </div>
      <form className="file-form" onSubmit={submitFileHandler}>
        {" "}
        <input className="file-input" type="file" />{" "}
        <div className="submit-file">
          <button type="submit"> Submit </button>{" "}
          <div className="files">
            {item ? (
              <FileList docs={docs} item={item} />
            ) : (
              <ul className="file-list">
                {" "}
                {docs &&
                  docs.map((doc) => (
                    <li
                      style={{ fontWeight: 600, fontSize: "22px" }}
                      key={Math.random() * 1232}
                    >
                      {" "}
                      {doc.fileName}{" "}
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormComponent;
