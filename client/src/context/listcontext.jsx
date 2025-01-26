import { createContext, useReducer, useState } from "react";

export const listcontext = createContext([]);

export const listReducer = (state, action) => {
  switch (action.type) {
    case "set_list":
      return {
        list: action.payload,
      };
    case "create_task":
      if (!state.list.includes(action.payload)) {
        return {
          ...state,
          list: [...state.list, action.payload],
        };
      }

      return {
        state,
      }; // Prevent duplicate updates

    // case "set_tasks":
    //     return {
    //         tasks: action.payload
    //     }
    case "new_task":
      return {
        task: [...state.tasks, action.payload],
      };
    default:
      return state;
  }
};

export const ListContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(listReducer, {
    list: [
      { name: "affsdf", number: 1 },
      { name: "wte", number: 2 },
    ],
    tasks: ["okok", "nice"],
  });

  return (
    <listcontext.Provider value={{ ...state, dispatch }}>
      {children}
    </listcontext.Provider>
  );
};
