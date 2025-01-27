import { useEffect, useState } from "react";
import useFetch from "./hooks/useFetch";
import { Link } from "react-router-dom";

const Movies = () => {
  const { Data: movies } = useFetch(import.meta.env.VITE_API_URL + "movies");

  return (
    <div>
      <h2>movie list:</h2>
      {movies.map((movie) => (
        <div key={movie._id}>
          <Link to={"/movies/" + movie._id}>
            <div>{movie.name}</div>
            <div>{movie.year}</div>
            <br></br>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Movies;
