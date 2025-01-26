import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useCommentsContext } from "./hooks/useCommentsContext";
import { AuthContext } from "./context/AuthContext";

const Newcomment = (({ movie }) => {

    const { comments, dispatch } = useCommentsContext()
    const { user } = useContext(AuthContext)
    // const { user } = useContext(AuthContext)

    const navigate = useNavigate()


    const [name, setName] = useState("")
    const [text, setText] = useState("")
    const [parentid, setParentid] = useState("")
    const [movieid, setMovieid] = useState(movie._id)
    const [year, setYear] = useState("")
    // const [userid, setUserid] = useState("")





    const handleSubmit = async (e) => {
        e.preventDefault()


        const newComment = { text, parentid, movieid };

        if (user) {
            const response = await fetch("http://localhost:3000/newcommentu", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ` + user.token
                },
                body: JSON.stringify(newComment)
            })

            const json = await response.json()

            // dispatch({ type: "create_comment", payload: data })
            console.log(json)
            window.location.reload()
        }
        else {
            window.alert("please sign in first")
        }


    }

    const neww = ((e) => {
        console.log("butoone")

    })

    return (
        <>

            <form onSubmit={handleSubmit}>
                <fieldset>
                    <h4>Add a comment</h4>



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
                        value={parentid}>
                    </input>

                    <input
                        type="hidden"
                        name="movieid"
                        value={movieid}>
                    </input>

                    <button type="submit">submit</button>
                </fieldset>
            </form></>
    );

})

export default Newcomment;




