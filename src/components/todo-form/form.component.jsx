import "./form.style.less";
import { addTodo } from "../../utils/firebase.util";
import { useState } from "react";
import { updateTodo } from "../../utils/firebase.util";

import { uploadFile, getFileUrl } from "../../utils/firebase.util";

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
        location.reload();
      } catch (err) {
        console.log(err);
      }
    } else {
      const { id } = formState;
      try {
        console.log("Updating");
        await updateTodo(id, todo);
        alert("Updated!");
        location.reload();
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
    await uploadFile(file);
    const url = await getFileUrl(fileName);

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
            {docs.length > 0
              ? docs.map(({ fileName, url }) => (
                  <a target="_blank" key={Math.random() * 10000} href={url}>
                    {" "}
                    <img
                      className="file-image"
                      src="/elonIcon.png"
                      alt={fileName}
                    />
                  </a>
                ))
              : ""}
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormComponent;
