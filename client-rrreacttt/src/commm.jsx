const CommentBox = ({ comments }) => {
  // console.log(blogs[0].writer + " " + blogs[1].writer);
  return (
    <div>
      {comments.map((comment) => (
        <div
          className="blog-preview"
          key={comment.id}
          // onClick={() => {
          //   handleDel(blogs.id);
          // }}
        >
          <h2>{comment.text}</h2>
          <p>{comment.likes}</p>
          {/* <div>
            {comment.replies.map((reply) => (
              <div> {reply.text2} </div>
            ))}
          </div> */}
          {/* <div>{comment.replies}</div> */}
          <p>real</p>
        </div>
      ))}
    </div>
  );
};

export default CommentBox;
