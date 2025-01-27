import { useParams } from "react-router-dom";
import Commentsection from "./commentsection";
import { useEffect, useState } from "react";
import useFetch from "./hooks/useFetch";

const Selectedcomment = () => {
  const { id } = useParams();
  const [movieid, setMovieid] = useState(null);

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + "commentu/" + id)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setMovieid(data[0].movieid);
      });
  }, [id]);
  console.log(movieid);

  const { Data, loading } = useFetch(
    movieid ? import.meta.env.VITE_API_URL + "movies/" + movieid : null
  );

  const { movie, comments = [] } = Data || {};

  useEffect(() => {
    console.log("Updated movieid:", movieid);
  }, [movieid]);

  return (
    <>
      <div>
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
        <Commentsection comments={comments} movie={movie} selected={id} />
      )}
    </>
  );
};

export default Selectedcomment;
