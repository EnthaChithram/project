import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [loading, SetLoading] = useState(true);
  const [error, setError] = useState(null);

  const [Data, SetData] = useState([

  ]);

  const [comments, SetComments] = useState([
    {
      text: "ofdhgdfk ok ok",
      likes: 2453,
      replies: [
        { text2: "nononon" },
        { text2: "fg fhg" },
        { text2: "4fvgvfgv" },
      ],
      id: 445,
    },
  ]);


  useEffect(() => {
    setTimeout(() => {
      fetch(url)
        .then((res) => {
          if (!res.ok) { // error coming back from server
            throw Error('Doesnt exist');
          }
          return res.json();
        })
        .then((data) => {
          SetLoading(false);
          SetData(data);
        })
        .catch((err) => {
          // auto catches network / connection error
          SetLoading(false);
          setError(err.message);
        });
    }, 500);
  }, []);

  return { loading, Data, error };
};

export default useFetch;
