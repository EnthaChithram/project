import { useContext, useEffect, useState } from "react";
import useFetch from "./hooks/useFetch";
import Nestedversion from "./nestedversion";
import Newcomment from "./newcomment";
import Reply from "./reply";
import { useCommentsContext } from "./hooks/useCommentsContext";
import { formatDistanceToNow } from "date-fns";
import { AuthContext } from "./context/AuthContext";

const Commentsection = ({ movie, selected }) => {
  const { comments, dispatch, isReplying } = useCommentsContext();

  const [cc, setcc] = useState(null);
  const [view, setView] = useState(true);
  const [reply, setReply] = useState(true);
  const { user } = useContext(AuthContext);

  const handleReply = (id) => {
    if (cc === id) {
      dispatch({ type: isReplying ? "reply_off" : "reply_on" });
    } else {
      setcc(id);
      dispatch({ type: "reply_on" });
    }
  };

  const handleDelete = async (id, childrenlength) => {
    if (childrenlength === 0) {
      dispatch({ type: "delete_comment", payload: id });
    } else {
      dispatch({ type: "update", payload: id });
    }

    const response = await fetch(
      import.meta.env.VITE_API_URL + "commentu/" + id,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ` + user.token,
        },
      }
    );

    const json = await response.json();
  };

  const renderComments = (comments) => {
    return comments.map((comment) => (
      <div
        key={comment._id}
        style={{
          marginLeft: comment.parentid === null ? "10px" : "30px",
          color: comment._id === selected ? "black" : "#be0f84",
        }}
      >
        <p>
          <strong>
            @{comment.userid ? comment.userid?.username : "[deleted]"}
          </strong>{" "}
          <i style={{ fontSize: "12px" }}>
            {" "}
            {formatDistanceToNow(new Date(comment.createdAt), {
              addSuffix: true,
            })}
          </i>
          {user && comment.userid && comment.userid._id === user.userid ? (
            <button
              onClick={() => {
                handleDelete(comment._id, comment.children.length);
              }}
            >
              delete
            </button>
          ) : null}
        </p>

        <div>
          {comment.text}
          {/* <i style={{ color: "red" }}>({comment._id})</i> */}
        </div>
        {cc === comment._id && isReplying ? (
          <Reply movie={movie} comment={comment} />
        ) : null}
        <button
          onClick={() => {
            handleReply(comment._id);
          }}
        >
          {cc === comment._id && isReplying ? "cancel" : "REPLY"}
        </button>

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
    <div
      style={{
        maxWidth: "750px",
        margin: "30px 270px",
        border: "solid black 1px",
        padding: "5px",
      }}
    >
      <div>-----</div>
      <br></br>
      <div>
        <Newcomment movie={movie} />
      </div>
      <div>
        <h2>Comments</h2>
        {comments && comments.length > 0 ? (
          renderComments(Nestedversion(comments))
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
    </div>
  );
};

export default Commentsection;
