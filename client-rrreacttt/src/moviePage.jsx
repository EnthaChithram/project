import { useEffect, useState } from "react";
import useFetch from "./useFetch";
import { useParams } from "react-router-dom";

import Commentsection from "./commentsection";


const Moviepage = (() => {
    const { id } = useParams();

    const { Data, loading } = useFetch("http://localhost:3000/movies/" + id)


    const { movie, comments } = Data || []




    return (
        <>
            <div>
                {loading ? (<h1>LOADING...</h1>) : (movie ? (

                    <>
                        <h1>{movie.name}</h1>
                        <h4>{movie.year}</h4>
                    </>

                ) : (<h1>NOT FOUND</h1>))}

            </div>

            {comments && movie && <Commentsection comments={comments} movie={movie} />}

        </>
    )
})

export default Moviepage; 