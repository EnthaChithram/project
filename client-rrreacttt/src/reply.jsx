import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "./context/AuthContext"

const Reply = (({ movie, comment }) => {

    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [text, setText] = useState("")
    const [parentid, setParentid] = useState(comment._id)
    const [movieid, setMovieid] = useState(movie._id)
    const [year, setYear] = useState("")

    const { user } = useContext(AuthContext)



    const handleSubmit = async (e) => {
        e.preventDefault();

        const newComment = { text, parentid, movieid };

        fetch("http://localhost:3000/newcommentu", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ` + user.token
            },
            body: JSON.stringify(newComment)
        }).then(() => {
            window.location.reload();
        })

        // Check for errors in respon
    };

    const neww = ((e) => {
        console.log("butoone")

    })

    return (
        <form onSubmit={handleSubmit}>

            <textarea
                type="text"
                id="text"
                name="text"
                required
                value={text}
                onChange={(e) => setText(e.target.value)}>
            </textarea>


            <input
                type="hidden"
                name="parentid"
                value={parentid}
            >
            </input>

            <input
                type="hidden"
                name="movieid"
                value={movieid}
            >
            </input>

            <button type="submit">reply</button>


        </form>
    );

})

export default Reply;




