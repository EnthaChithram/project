import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { commentsContext } from "./context/commentscontext";

const Reply = ({ movie, comment }) => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [parentid, setParentid] = useState(comment._id);
  const [movieid, setMovieid] = useState(movie._id);
  const [year, setYear] = useState("");

  const { user } = useContext(AuthContext);
  const { dispatch } = useContext(commentsContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newComment = { text, parentid, movieid };

    const response = await fetch(import.meta.env.VITE_API_URL + "newcommentu", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ` + user.token,
      },
      body: JSON.stringify(newComment),
    });

    const json = await response.json();
    dispatch({ type: "reply_off" });
    dispatch({ type: "create_comment", payload: json });
  };

  const neww = (e) => {
    console.log("butoone");
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        type="text"
        id="text"
        name="text"
        required
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>

      <input type="hidden" name="parentid" value={parentid}></input>

      <input type="hidden" name="movieid" value={movieid}></input>

      <button type="submit">reply</button>
    </form>
  );
};

export default Reply;
