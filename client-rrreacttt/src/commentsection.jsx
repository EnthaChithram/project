import { useContext, useEffect, useState } from "react";
import useFetch from "./hooks/useFetch";
import Nestedversion from "./nestedversion";
import Newcomment from "./newcomment";
import Reply from "./reply";
import { useCommentsContext } from "./hooks/useCommentsContext";
import { formatDistanceToNow } from "date-fns"
import { AuthContext } from "./context/AuthContext";



const Commentsection = (({ movie, selected }) => {

    const { comments, dispatch } = useCommentsContext()

    const [cc, setcc] = useState(null)
    const [view, setView] = useState(true)
    const [reply, setReply] = useState(true)
    const { user } = useContext(AuthContext)



    const handleReply = ((id) => {
        if (cc === id) {
            setView(!view)
        }
        else {
            setcc(id)
            setView(true)
        }
    })

    const handleDelete = ((id) => {

        fetch("http://localhost:3000/commentu/" + id, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ` + user.token
            }


        }).then((res) => {
            console.log(res)
            window.location.reload()
        })

    })




    const renderComments = (comments) => {
        return comments.map((comment) => (
            <div key={comment._id} style={{ marginLeft: comment.parentid === null ? "10px" : "30px", color: comment._id === selected ? "black" : "#be0f84", }}>
                <p>
                    <strong>@{comment.userid ? comment.userid?.username : "noname"}</strong> <i style={{ fontSize: "12px" }}> {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}</i>{user && comment.userid && comment.userid._id === user.userid ? (<button onClick={(() => { handleDelete(comment._id) })}>delete</button>) : null}
                </p>

                <div>
                    {comment.text}
                    {/* <i style={{ color: "red" }}>({comment._id})</i> */}
                </div>
                {cc === comment._id && view ? (<Reply movie={movie} comment={comment} />) : null}
                <button onClick={() => { handleReply(comment._id) }}>{cc === comment._id && view ? "cancel" : "REPLY"}</button>



                <br></br>
                {/* children loop*/}
                {/* {console.log(comment.parentid)} */}
                {comment.children && comment.children.length > 0 && (
                    <div>{renderComments(comment.children)}</div>
                )}
            </div>

        ));
    };

    return (
        <div style={{
            maxWidth: "750px", margin: "30px 270px", border: "solid black 1px", padding: "5px"
        }}>
            <div>
                -----
            </div>
            <br></br>
            <div><Newcomment movie={movie} /></div>
            <div>
                <h2 >Comments</h2>
                {comments && comments.length > 0 ? (
                    renderComments(Nestedversion(comments))
                ) : (
                    <p>No comments yet.</p>
                )}
            </div>

        </div>
    )
})


export default Commentsection;