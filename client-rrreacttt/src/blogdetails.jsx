
import { Navigate, useNavigate, useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { useState } from "react";


const Blogdetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [mes, setmes] = useState("")

    const { Data: blog, loading, error } = useFetch("http://localhost:8000/blogs/" + id);






    const deletebutton = ((id) => {
        fetch("http://localhost:8000/blogs/" + id, {
            method: "DELETE",

        }).then(() => {
            setmes("DELETING...")

            setTimeout(() => {

                navigate("/")
            }, 1000);

        })

    })

    return (
        <div>
            {loading && <div className="loading"> "LOADING......." </div>}
            <div className="blog-preview" key={blog.id} >
                <h2>{blog.name}</h2>
                <p>{blog.body}</p>

                <p>written by: {blog.writer}</p>
                <p>{mes}</p>
            </div>
            <h1>{error}</h1>

            <button onClick={() => { deletebutton(blog.id) }}> DELETE </button>

        </div>
    );
};

export default Blogdetails;
