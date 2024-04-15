import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onChangingEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangingPassword = (event) => {
    setPassword(event.target.value);
  };

  useEffect(() => {
    let auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, [navigate]);

  const onLogin = async () => {
    console.log(email);
    console.log(password);
    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    let result = await fetch("http://localhost:4000/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    console.log("result");
    console.log(result);
    if (result.auth) {
      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("token", JSON.stringify(result.auth));
      if (result.user.password === password && result.user.email === email) {
        navigate("/");
      } 
    } else {
      alert("Please enter correct details");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="login">
      <h1 className="each-route-top-heading">Login</h1>
      <input
        className="inputBox"
        type="text"
        value={email}
        onChange={onChangingEmail}
        placeholder="Enter Email"
        required // Added required attribute
      />
      <input
        className="inputBox"
        type="password" // Changed input type to password for better security
        value={password}
        onChange={onChangingPassword}
        placeholder="Enter password"
        required // Added required attribute
      />
      <button className="btn btn-primary" onClick={onLogin} type="button">
        Login
      </button>
    </div>
  );
};

export default Login;
