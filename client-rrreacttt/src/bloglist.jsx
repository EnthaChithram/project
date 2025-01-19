import { Link } from "react-router-dom";

const BlogList = ({ blogs, handleDel }) => {
  // console.log(blogs[0].writer + " " + blogs[1].writer);
  return (
    <div>
      {blogs.map((blogs) => (

        <div className="blog-preview" key={blogs.id}>
          <Link to={"/blogs/" + blogs.id}>

            <h2>{blogs.name}</h2>
            <p>{blogs.writer}</p>
            <p>real</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
