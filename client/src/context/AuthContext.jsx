import { createContext, useEffect, useReducer, useState } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        user: action.payload,
      };
    case "LOGOUT":
      localStorage.removeItem("user");
      return {
        user: null,
      };

    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    loading: true,
    authError: null,
  });

  useEffect(() => {
    state.loading = true;
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      dispatch({ type: "LOGIN", payload: user });
      state.loading = false;
    } else {
      state.authError = "no user";
      state.loading = false;
    }
  }, []);

  console.log("from auth", state.user);
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
