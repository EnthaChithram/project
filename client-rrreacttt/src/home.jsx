import { useState, useEffect } from "react";
import BlogList from "./bloglist";
import CommentBox from "./commm";
import useFetch from "./useFetch";
import { Link } from "react-router-dom";
// const mongoose = require("mongoose");

const Home = () => {
  const { Data: comments } = useFetch("http://localhost:8000/comments");
  const { loading, Data: Blogs } = useFetch("http://localhost:8000/blogs");

  const handleClick = () => {
    console.log("hello, ninjas");
  };

  // const dbURL =
  //   "mongodb+srv://asdf:ASDF123@cluster0.ms8hx.mongodb.net/pracccc?retryWrites=true&w=majority&appName=Cluster0";

  // mongoose.connect(dbURL).then(() => {
  //   console.log("OK");
  // });

  const bloo = [
    { name: "111", body: "wow", writer: "abc", id: 1 },
    { name: "222", body: "wow", writer: "def", id: 2 },
  ];

  console.log("kjhkjhkj");

  const handleDel = (id) => {
    console.log("dledlelde");
    const bloi = Blogs.filter((ele) => ele.id !== id);
    SetBlogs(bloi);
    console.log(Blogs);
    console.log(bloi);
  };

  const change = () => {
    setname("zzzzz");
  };

  const [name, setname] = useState("jakfha");

  console.log("last");



  return (
    <div className="home">
      {loading && <div className="loading"> "LOADING......." </div>}
      {Blogs && <BlogList blogs={Blogs} handleDel={handleDel} />}
      <Link to="http://localhost:5173/fdggr">
        <div>ajkfhdkjfh </div>
      </Link>
      <div onClick={change}> {name} </div>
      <CommentBox comments={comments} />
    </div>
  );
};

export default Home;
