import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export const useLogout = () => {
  const { dispatch } = useContext(AuthContext);

  const logout = async () => {
    // localStorage.removeItem('user')
    dispatch({ type: "LOGOUT" });
  };

  return { logout };
};
