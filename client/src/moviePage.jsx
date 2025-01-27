import { useEffect, useState } from "react";
import useFetch from "./hooks/useFetch";
import { useParams, useLocation } from "react-router-dom";

import Commentsection from "./commentsection";
import { useCommentsContext } from "./hooks/useCommentsContext";

const Moviepage = () => {
  const { id } = useParams();
  const location = useLocation();
  const [movie, setMovie] = useState(null);
  // const [comments, setComments] = useState(null)

  const { comments, dispatch } = useCommentsContext();

  const { Data, loading } = useFetch(
    import.meta.env.VITE_API_URL + "movies/" + id
  );

  // const { movie, comments = [] } = Data || {}

  useEffect(() => {
    if (Data) {
      const { movie, comments = [] } = Data;
      setMovie(movie);
      // const tasks = ["do this", "do that"]
      dispatch({ type: "set_comments", payload: comments });
      // dispatch({ type: "set_tasks", payload: tasks })
      // console.log(tasks)
    }
  }, [Data]);

  if (loading) {
    return <div> loading...</div>;
  }

  return (
    <>
      <div
        className="moviepage"
        style={{
          maxWidth: "400px",
          margin: "30px auto",
          textAlign: "center",
        }}
      >
        {loading ? (
          <h1>LOADING...</h1>
        ) : movie ? (
          <>
            <h1>{movie.name}</h1>
            <h4>{movie.year}</h4>
          </>
        ) : (
          <h1>NOT FOUND</h1>
        )}
      </div>

      {comments && movie && (
        <Commentsection
          comments={comments}
          movie={movie}
          selected="678ab7100ffa713184930be2"
        />
      )}
    </>
  );
};

export default Moviepage;
