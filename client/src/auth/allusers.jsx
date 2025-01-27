import { useContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";
import { colorcontext } from "../context/colorcontext";
import { listcontext } from "../context/listcontext";

const Users = () => {
  const [users, setUsers] = useState([]);
  const { color, changecolor } = useContext(colorcontext);
  const { list, dispatch } = useContext(listcontext);
  const [name, setname] = useState([]);
  const [number, setnumber] = useState([]);

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + "users")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setUsers(data);
      });

    fetch(import.meta.env.VITE_API_URL + "list")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        dispatch({ type: "set_list", payload: data });
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newitem = { name, number };

    fetch(import.meta.env.VITE_API_URL + "newlist", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newitem),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        dispatch({ type: "create_task", payload: data });
      });
  };
  return (
    <div>
      <h1 style={{ color: color }} onClick={() => changecolor(color)}>
        {" "}
        colorrrrr{" "}
      </h1>
      <br></br>

      {list.map((item) => (
        <div key={item._id}>
          <div>{item.name}</div>
          <div>{item._id}</div>
          <div>{item.number}</div>
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        <label>name</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={name}
          onChange={(e) => setname(e.target.value)}
        />

        <label>number</label>
        <textarea
          type="number"
          id="number"
          name="number"
          required
          value={number}
          onChange={(e) => setnumber(e.target.value)}
        ></textarea>

        <button type="submit">submit</button>
      </form>
      <br></br>

      <br></br>
      <h2>user list:</h2>
      {users.map((user) => (
        <div key={user._id}>
          <div>{user.username}</div>
          <div>{user.password}</div>
          <br></br>
        </div>
      ))}
    </div>
  );
};

export default Users;

// function NewsletterList() {
//     const [users, setUsers] = usestate([]) :
//     useEffect(() => {
//     const handleNewUsers = () => {
//             const newUsers = DataSource.getSubscribers():
//             setUsers(newUsers)
//     }
//         DataSource.addListener(handleNewUsers)
//     return () => 1
//         DataSource.removeListener(handleNewUsers)
// }
// },[])
