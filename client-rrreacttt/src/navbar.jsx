import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="navbar">


        <h1><Link to="/movies"> MOVIES </Link></h1>


      </div>
      <div > <h3 style={{ color: "red" }}>DISCLAIMER:</h3> <p>CSS implementation of the website is still in progress</p></div>
    </>
  );
};

export default Navbar;
