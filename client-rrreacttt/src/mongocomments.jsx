import { useEffect, useState } from "react";

const Mongocomments = (() => {
    const [comments, setcomments] = useState([])
    const [text, setcomment] = useState("")
    const [name, setname] = useState("")

    useEffect(() => {
        fetch("http://localhost:3000/comments")
            .then((res) => {
                return res.json();
            }).then((data) => {
                setcomments(data)
                console.log(data)
            })

    }, [])

    const submit = ((e) => {
        e.preventDefault()
        console.log(name, text)

        fetch("http://localhost:3000/newcomment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: "sfddf", text: "fsf" })

        })
    })

    return (

        <div>
            {comments.map((com) => (
                <div key={com._id}>
                    <div>{com.text}</div>
                    <p>BY:{com.name}</p>
                    <div>{com.user}</div>
                    <br></br>
                </div>


            ))}
            <p>hjkfkhfhk</p>

            <form onSubmit={submit}>
                <fieldset>
                    <label>your comment </label>
                    <input
                        type="text"
                        placeholder="type here"
                        value={text}
                        onChange={(e) => { setcomment(e.target.value) }}>
                    </input>

                    <label> your name</label>
                    <input
                        type="text"
                        placeholder="name"
                        value={name}
                        onChange={(e) => { setname(e.target.value) }}>
                    </input>
                    <button> post </button>

                </fieldset>
            </form>
        </div>
    )
})
export default Mongocomments;