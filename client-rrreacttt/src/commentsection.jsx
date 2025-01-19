import { useEffect, useState } from "react";
import useFetch from "./useFetch";
import Nestedversion from "./nestedversion";
import Newcomment from "./newcomment";
import Reply from "./reply";


const Commentsection = (({ comments, movie }) => {

    const [cc, setcc] = useState(null)
    const [view, setView] = useState(true)
    const [reply, setReply] = useState(true)


    const handleReply = ((id) => {

        if (cc === id) {

            setView(!view)

        }
        else {
            setcc(id)
            setView(true)

        }

    })


    const renderComments = (comments) => {
        return comments.map((comment) => (
            <div key={comment._id} style={{ marginLeft: "20px", color: "#be0f84" }}>
                <p><strong>{comment.name}</strong>: {comment.text}</p>
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
        <>
            <div>
                -----
            </div>
            <br></br>
            <div><Newcomment movie={movie} /></div>
            <div>
                <h2>Comments</h2>
                {comments && comments.length > 0 ? (
                    renderComments(Nestedversion(comments))
                ) : (
                    <p>No comments yet.</p>
                )}
            </div>

        </>
    )
})


export default Commentsection;