import { createContext, useState, useEffect } from "react";
import { getAllTodos } from "../utils/firebase.util";

const context = {
  state: [],
  stateHandler: () => null,
};

export const StateContext = createContext(context);

export const StateContextProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  

  useEffect(() => {
    getAllTodos().then((res) => {
      setTodos(res);
    });
  }, []);

  const value = { todos, setTodos };

  return (
    <StateContext.Provider value={value}> {children} </StateContext.Provider>
  );
};


