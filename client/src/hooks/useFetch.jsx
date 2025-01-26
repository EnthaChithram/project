import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [loading, SetLoading] = useState(true);
  const [error, setError] = useState(null);

  const [Data, SetData] = useState([]);

  useEffect(() => {
    if (!url) {
      return;
    }
    setTimeout(() => {
      fetch(url)
        .then((res) => {
          if (!res.ok) {
            // error coming back from server
            throw Error("Doesnt exist");
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
    }, 0);
  }, [url]);

  return { loading, Data, error };
};

export default useFetch;
