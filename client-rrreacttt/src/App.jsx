import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Home from "./home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Create from "./create";
import Navbar from "./navbar";
import Blogdetails from "./blogdetails";
import Mongocomments from "./mongocomments";
import Movies from "./movies";
import Moviepage from "./moviePage";
import Commentsection from "./commentsection";


function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>


          <Route path="/" element={<Movies />}></Route>

          <Route path="/movies" element={<Movies />}></Route>
          <Route path="/movies/:id" element={<Moviepage />}></Route>


        </Routes>
      </Router>
    </div>
  );
}

export default App;
