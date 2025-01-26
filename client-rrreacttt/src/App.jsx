import React, { useContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Navbar from "./navbar";

import Movies from "./movies";
import Moviepage from "./moviePage";
import Commentsection from "./commentsection";
import Selectedcomment from "./selectedcomment";
import Signup from "./auth/signup";
import Users from "./auth/allusers";
import Login from "./auth/login";
import { AuthContext } from "./context/AuthContext";
import { MyComments } from "./mycomments";
import { Loading } from "./loading";

function App() {
  const { user, loading } = useContext(AuthContext);
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Movies />}></Route>

          <Route path="/movies" element={<Movies />}></Route>
          <Route path="/movies/:id" element={<Moviepage />}></Route>
          <Route path="/comments/:id" element={<Selectedcomment />}></Route>

          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/" />}
          ></Route>
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          ></Route>
          <Route path="/users" element={<Users />}></Route>
          <Route path="/mycomments" element={<MyComments />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
