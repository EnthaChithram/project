import React, { useEffect, useState } from "react";
import useFetch from "./useFetch";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [name, setName] = useState('');
  const [body, setBody] = useState('');
  const [writer, setWriter] = useState('abc');

  const navigate = useNavigate()

  const submit = (e) => {
    e.preventDefault()
    const newblog = { name, body, writer }
    console.log("submitted");

    fetch("http://localhost:8000/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newblog)

    }).then(() => {

      navigate("/");
    })



  }
  const { Data: blogs } = useFetch("http://localhost:8000/blogs")


  useEffect(() => {
    fetch("http://localhost:3300/cars")
      .then((res) => {
        return res.json()
      })
      .then(data => {
        console.log(data)
      })

  }, [])

  let c = 0;
  return (
    <div>
      <div>zzzz</div>
      <form onSubmit={submit}>
        <fieldset>
          <div>
            <label>blog name</label>
            <input
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required />
          </div>
          <br></br>

          <label>Blog body:</label>
          <textarea
            placeholder="Enter text"
            required
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
          <select
            value={writer}
            onChange={(e) => setWriter(e.target.value)}
          >

            {blogs.map((blog) => {
              if (c < 3) {
                c++;
                return blog.writer && <option key={blog.id} value={blog.writer} > {blog.writer}</option>

              }
            })}



          </select>
          <button>ADD</button>
        </fieldset>
      </form>

      <div> </div>

    </div >


  )
};

export default Create;
