import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const Reply = (({ movie, comment }) => {

    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [text, setText] = useState("")
    const [parentid, setParentid] = useState(comment._id)
    const [movieid, setMovieid] = useState(movie._id)
    const [year, setYear] = useState("")



    const handleSubmit = async (e) => {
        e.preventDefault();

        const newComment = { name, text, parentid, movieid };

        fetch("http://localhost:3000/newcommentu", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
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

            <label>name</label>
            <input
                type="text"
                id="name"
                name="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <label>TEXT</label>
            <textarea
                type="text"
                id="text"
                name="text"
                required
                value={text}
                onChange={(e) => setText(e.target.value)}>
            </textarea>

            {/* <label>parentid</label>
                <input
                    type="text"
                    id="parentid"
                    name="parentid"
                    value={parentid}
                    onChange={(e) => setParentid(e.target.value)}>
                </input> */}

            {/* <label>movieid</label>
                <input
                    type="text"
                    id="movieid"
                    name="movieid"
                    required
                    value={movieid}
                    onChange={(e) => setMovieid(e.target.value)}>
                </input> */}



            <button type="submit">submit</button>


        </form>
    );

})

export default Reply;




