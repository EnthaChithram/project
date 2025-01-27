import { useState } from "react";

const Spam = () => {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [parentid, setParentid] = useState("");
  const [movieid, setMovieid] = useState("");
  const [year, setYear] = useState("");

  const handlesubmit = (e) => {
    e.preventDefault();

    // const newcomment = { name, comment, parentid, movieid }
    // console.log(newcomment)

    const newmovie = { name, year };
    console.log(newmovie);

    fetch("import.meta.env.VITE_API_URLnewmovie", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, year }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
  };

  return (
    <form onSubmit={handlesubmit}>
      <fieldset>
        <label>name</label>
        <input
          type="text"
          id="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>

        <label>year</label>
        <input
          type="number"
          i="year"
          required
          value={year}
          onChange={(e) => setYear(e.target.value)}
        ></input>

        <button type="submit">submit</button>
      </fieldset>
    </form>
  );
};

export default Spam;
