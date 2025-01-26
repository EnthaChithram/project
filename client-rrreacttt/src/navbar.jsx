import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { useLogout } from "./hooks/useLogout";

const Navbar = () => {
  const { user } = useContext(AuthContext)
  const { logout } = useLogout()
  user && console.log("from navbar", user.username)


  return (
    <>
      <div className="navbar">


        <h1><Link to="/movies"> MOVIES </Link></h1>
        {user && <h1><Link to="/mycomments"> my comments </Link></h1>}

        {!user &&
          <div>
            <Link to="/signup"> SIGN UP </Link>
            <Link to="/login"> LOGIN </Link>
          </div>}



        {user && <h1>Hello, {user.username} </h1>}

        {user && <h1 onClick={() => { logout() }}><Link to="/"> logout </Link></h1>}

      </div >
      <div > <h3 style={{ color: "red" }}>DISCLAIMER:</h3> <p>CSS implementation of the website is still in progress</p></div>
    </>
  );
};

export default Navbar;