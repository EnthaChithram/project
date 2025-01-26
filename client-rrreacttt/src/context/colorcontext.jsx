import { createContext, useReducer, useState } from "react";

export const colorcontext = createContext([]);

export const Colorcontextprovider = ({ children }) => {
  const [color, setcolor] = useState("red");
  const changecolor = (color) => {
    console.log("clicked");
    setcolor(color === "red" ? "black" : "red");
  };

  return (
    <colorcontext.Provider value={{ color, setcolor, changecolor }}>
      {children}
    </colorcontext.Provider>
  );
};
