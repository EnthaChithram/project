import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

export const Loading = () => {
  const { authError } = useContext(AuthContext);

  return (
    <>
      <div>LOADING.....</div>
      {authError && <h1>{authError}</h1>}
    </>
  );
};
