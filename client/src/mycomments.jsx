import { Link, useParams } from "react-router-dom";
import useFetch from "./hooks/useFetch";
import { useContext, useEffect } from "react";
import { AuthContext } from "./context/AuthContext";
import { Loading } from "./loading";

export const MyComments = () => {
  const { user } = useContext(AuthContext);

  const {
    Data = {},
    loading,
    error,
  } = useFetch(
    user ? import.meta.env.VITE_API_URL + "user/" + user.userid : null
  );

  if (!user) {
    return (
      <>
        <Loading></Loading>
        <h1>pleaselog in to load your comments</h1>
      </>
    );
  }

  const { user: userdata = {}, comments = [] } = Data;

  return (
    <div>
      {loading ? <h1>loading...</h1> : <h1>my comments:</h1>}

      {comments.map((comment) => (
        <Link
          key={comment._id}
          style={{ textDecoration: "none", color: "blue" }}
          to={"/movies/" + comment.movieid._id}
        >
          <div>
            <h1>{comment.movieid.name}</h1>
            <h3 style={{ color: "black" }}>{comment.text}</h3>
          </div>
        </Link>
      ))}
    </div>
  );
};
