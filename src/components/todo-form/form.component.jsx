import "./form.style.less";
import { addTodo } from "../../utils/firebase.util";
import { useState } from "react";
import { updateTodo } from "../../utils/firebase.util";

const TodoForm = {
  name: "",
  description: "",
  date: "",
  time: "",
  docs: [],
};

const FormComponent = ({ item = null }) => {
  const [formState, setFormState] = useState(item || TodoForm);

  const { name, description, date, time, docs } = formState;
  console.log(formState);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const deadline = `${date} ${time}:00`;
    if (new Date(deadline) < new Date()) {
      alert("No deadlines for the past!");
      return;
    }

    const todo = { name, description, deadline, docs };

    if (!item) {
      try {
        console.log("Submitting");
        await addTodo(todo);
        alert("Submitted!");
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

  const onChangeHandler = (event) => {
    const { name, value } = event.target;

    setFormState({ ...formState, [name]: value });
  };
  return (
    <form className="form-send" onSubmit={onSubmitHandler}>
      <input
        type="text"
        name="name"
        value={name}
        placeholder="Todo name"
        required
        onChange={onChangeHandler}
      />
      <input
        type="text"
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

      <button type="submit"> Add todo </button>
    </form>
  );
};

export default FormComponent;
