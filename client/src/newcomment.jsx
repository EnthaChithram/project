import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCommentsContext } from "./hooks/useCommentsContext";
import { AuthContext } from "./context/AuthContext";

const Newcomment = ({ movie }) => {
  const { dispatch } = useCommentsContext();
  const { user } = useContext(AuthContext);
  // const { user } = useContext(AuthContext)

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [parentid, setParentid] = useState("");
  const [movieid, setMovieid] = useState(movie._id);
  const [year, setYear] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newComment = { text, parentid, movieid };

    if (user) {
      const response = await fetch(
        import.meta.env.VITE_API_URL + "newcommentu",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ` + user.token,
          },
          body: JSON.stringify(newComment),
        }
      );
      setText("");

      const json = await response.json();

      dispatch({ type: "create_comment", payload: json });
      //error

      console.log(json);
      //   window.location.reload();
    } else {
      window.alert("please sign in first");
    }
  };

  const neww = (e) => {
    console.log("butoone");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <textarea
            type="text"
            placeholder="Add a comment"
            id="text"
            name="text"
            required
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>

          <input type="hidden" name="parentid" value={parentid}></input>

          <input type="hidden" name="movieid" value={movieid}></input>

          <button type="submit">submit</button>
        </fieldset>
      </form>
    </>
  );
};

export default Newcomment;
