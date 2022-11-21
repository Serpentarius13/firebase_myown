import { useCallback } from "react";
import { createContext, useState, useEffect } from "react";
import { getAllTodos } from "../utils/firebase.util";

const context = {
  state: [],
  stateHandler: () => null,
  fetcher: () => null
};

export const StateContext = createContext(context);

export const StateContextProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);

  const fetcher = useCallback(() => {
    getAllTodos().then((res) => {
      setTodos(res);
    });
  }, []);

  useEffect(() => {
    fetcher()
  }, []);

  const value = { todos, setTodos, fetcher};

  return (
    <StateContext.Provider value={value}> {children} </StateContext.Provider>
  );
};
