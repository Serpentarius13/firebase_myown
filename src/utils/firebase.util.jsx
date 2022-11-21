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
  deleteObject,
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

// App init
const app = initializeApp(firebaseConfig);

// Firestore init
export const db = getFirestore(app);

// Collection ref
export const TodoCollection = collection(db, "todos");

/**
 * Accepts todo object and adds it into database collection
 *
 * @param {*} todo - Todo object to be added in collection
 * @returns reference of provided Todo object
 */
export async function addTodo(todo) {
  const docRef = await addDoc(TodoCollection, todo);

  return docRef;
}

/**
 * Fetches all documents from the collection and returns a reference. Later usage -> iterate with .data() or destructuring {id} to interact with one specific todo
 *
 * @returns A reference of fetched documents
 */

export async function getAllTodos() {
  const q = query(TodoCollection);
  const arr = await getDocs(q);
  const newArr = [];
  arr.forEach((el) => newArr.push(el));
  return newArr;
}

/**
 * With provided id of document fetches it.
 *
 * @param {*} id - Todo id to make reference and return it
 * @returns fetched document by id
 */

export async function getTodo(id) {
  const ref = doc(db, "todos", id);
  const todo = await getDoc(ref);

  return todo;
}

/**
 * With provided id of document removes it from collection
 *
 * @param {*} id - Todo id to make reference and return it
 */

export async function removeTodo(id) {
  console.log("Deleting");
  const docRef = doc(db, "todos", id);
  const deleted = await deleteDoc(docRef);
}

/**
 * With provided id updates Todo in collection with provided props
 *
 * @param {*} id - Todo id to make reference and return it
 * @param {*} props - new state with which todo is updated
 */

export async function updateTodoFirebase(id, props) {
  console.log("Updating");
  const docRef = doc(db, "todos", id);

  const updated = await updateDoc(docRef, { ...props });
}

/**
 * Removes all fetched at the moment todos from collection
 *
 * @param {*} todos - Fetched todos when the page is loaded initially
 */
export async function deleteAll(todos) {
  await todos.forEach(async (todo) => {
    const docRef = doc(db, "todos", todo.id);

    await deleteDoc(docRef);
  });

  alert("Finished deleting");
  return true;
}

// Init storage
const storage = getStorage();

/**
 * Accepts file and uploads it to Firestorage
 *
 * @param {*} file - File from input to be uploaded
 */
export async function uploadFile(file) {
  const fileRef = ref(storage, file.name);
  const uploadTask = await uploadBytes(fileRef, file);
}

/**
 * Fetches url of provided file that is stored in Firestorage
 *
 * @param {*} fileName - The name of file to be fetched for url
 * @returns url to be used later for download
 */
export async function getFileUrl(fileName) {
  const fileRef = ref(storage, fileName);
  const url = await getDownloadURL(fileRef);

  return url;
}
