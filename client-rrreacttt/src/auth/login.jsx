import { useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [servermsg, setServerMsg] = useState([]);

  const { error, loading, login, message } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(username, password);
    setServerMsg(message);
    console.log(message);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>username</label>
        <input
          type="text"
          id="username"
          name="username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label>password</label>
        <input
          type="text"
          id="password"
          name="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>

        <button type="submit">submit</button>
      </form>

      {message && (
        <>
          <div>{message.message} </div>
          <p style={{ color: "red" }}>{message.error} </p>
        </>
      )}
    </>
  );
};

export default Login;
