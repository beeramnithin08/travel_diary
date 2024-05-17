import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(true);

  const onLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light set-background-color">
        <a className="navbar-brand" href="#">
          <img
            src="https://i.ibb.co/VCCwYy3/travel-logo-removebg-preview.png"
            alt="avatar"
            className="icon-size"
          />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          onClick={handleToggle}
          aria-expanded={isCollapsed ? "false" : "true"}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse ${isCollapsed ? "" : "show"}`}
          id="navbarNavAltMarkup"
        >
          <div className="navbar-nav" style={{width:"100%"}}>
            
              {auth ? (
                <ul className="nav-ul">
                  <li>
                    <Link to="/" className="nav-link">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/entries" className="nav-link">
                      Entries
                    </Link>
                  </li>
                  <li>
                    <Link to="/add" className="nav-link">
                      Add Entry
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/login"
                      className="nav-link"
                      onClick={onLogout}
                    >
                      Logout ({JSON.parse(auth).name})
                    </Link>
                  </li>
                </ul>
              ) : (
                <ul className="nav-ul towards-right">
                  <li>
                    <Link to="/login" className="nav-link">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/signup" className="nav-link">
                      Signup
                    </Link>
                  </li>
                </ul>
              )}
           
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
 

    // <div className="navbar-container">
    //   <img src="https://i.ibb.co/VCCwYy3/travel-logo-removebg-preview.png"
    //   alt="avatar"
    //   className="icon-size" />
    // {auth ? (
    //   <ul className="nav-ul">
    //     <li>
    //       <Link to="/">Profile</Link>
    //     </li>
    //     <li>
    //       <Link to="/entries">Entries</Link>
    //     </li>
    //     <li>
    //       <Link to="/add">Add Entry</Link>
    //     </li>
    //     {/* <li>
    //       <Link to="/update">Update Entry</Link>
    //     </li> */}
    //     <li><Link to="/login" onClick={onLogout}>
    //       Logout ({JSON.parse(auth).name})
    //     </Link></li>
    //   </ul>
    // ) : (
    //   <ul className="nav-ul towards-right">
    //     <li>
    //       <Link to="/login">Login</Link>
    //     </li>
    //     <li>
    //       <Link to="/signup">Signup</Link>
    //     </li>
    //   </ul>
    // )}
    // </div>
