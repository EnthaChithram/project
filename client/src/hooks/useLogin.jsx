import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [message, setMessage] = useState(null);
  const { dispatch } = useContext(AuthContext);

  const login = async (username, password) => {
    setLoading(true);
    setError(null);
    setMessage(null);

    const response = await fetch(import.meta.env.VITE_API_URL + "login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const json = await response.json();
    if (!response.ok) {
      setLoading(false);
      setError(json.error);
      setMessage(json);
    }

    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json));

      dispatch({ type: "LOGIN", payload: json });
      setMessage(json);
      setLoading(false);
    }
  };

  return { loading, error, login, message };
};
