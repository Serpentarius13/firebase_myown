import {
  getFileUrl,
  getTodo,
  updateTodo,
  uploadFile,
} from "../../utils/firebase.util";

const FileForm = ({ id = null }) => {
  const submitHandler = async (event) => {
    event.preventDefault();
    const file = event.target[0].files;

    console.log(file)

    return;

    await uploadFile(file);

    let todo = await getTodo(id);
    todo = todo.data();

    const docs = todo.docs;

    const url = await getFileUrl(file.name);

    await updateTodo(id, {
      ...todo,
      docs: [...docs, { name: file.name, url }],
    });

    alert("Done uploading");
  };
  return (
    <form onSubmit={submitHandler}>
      {" "}
      <input type="file" /> <button type="submit"> Submit </button>
    </form>
  );
};

export default FileForm;
