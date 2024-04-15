import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    
      <div className="navbar-container">
        <img src="https://i.ibb.co/VCCwYy3/travel-logo-removebg-preview.png"
        alt="avatar"
        className="icon-size" />
      {auth ? (
        <ul className="nav-ul">
          <li>
            <Link to="/">Profile</Link>
          </li>
          <li>
            <Link to="/entries">Entries</Link>
          </li>
          <li>
            <Link to="/add">Add Entry</Link>
          </li>
          {/* <li>
            <Link to="/update">Update Entry</Link>
          </li> */}
          <li><Link to="/login" onClick={onLogout}>
            Logout ({JSON.parse(auth).name})
          </Link></li>
        </ul>
      ) : (
        <ul className="nav-ul towards-right">
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
        </ul>
      )}
      </div>
  
  );
};

export default Nav;
