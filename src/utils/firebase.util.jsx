// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  setDoc,
  getDoc,
  getDocs,
  query,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

import {
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1QjhDcwXUX7kCaAlBljZw8JbVIor1aiw",
  authDomain: "todo-72003.firebaseapp.com",
  projectId: "todo-72003",
  storageBucket: "todo-72003.appspot.com",
  messagingSenderId: "870948597899",
  appId: "1:870948597899:web:f582ec2cf87d4d3db7648e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const TodoCollection = collection(db, "todos");

export async function addTodo(todo) {
  const docRef = await addDoc(TodoCollection, todo);

  return docRef;
}

export async function getAllTodos() {
  const q = query(TodoCollection);
  const arr = await getDocs(q);
  const newArr = [];
  arr.forEach((el) => newArr.push(el));
  return newArr;
}

export async function getTodo(id) {
  const ref = doc(db, "todos", id);
  const todo = await getDoc(ref);

  return todo;
}

export async function removeTodo(id) {
  console.log("Deleting");
  const docRef = doc(db, "todos", id);
  console.log(docRef);
  const deleted = await deleteDoc(docRef);
}

export async function updateTodo(id, props) {
  console.log("Updating");
  const docRef = doc(db, "todos", id);

  const updated = await updateDoc(docRef, { ...props });
  return updated;
}

export async function deleteAll(todos) {
  todos.forEach(async (todo) => {
    const docRef = doc(db, "todos", todo.id);

    await deleteDoc(docRef);
  });

  alert('Finished deleting');
  return true;
}

const storage = getStorage();

export async function uploadFile(file) {
  const fileRef = ref(storage, file.name);
  const uploadTask = uploadBytesResumable(fileRef, file);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Uploading at " + progress);
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
      }
    },
    (err) => {
      console.log(err);
    }
  );

  return uploadTask;
}

export async function getFileUrl(fileName) {
  const fileRef = ref(storage, fileName);
  const url = await getDownloadURL(fileRef);

  return url;
}
