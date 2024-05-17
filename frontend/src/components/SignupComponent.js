import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const SignupForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onChangingName = (event) => {
    setName(event.target.value);
  };

  const onChangingEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangingPassword = (event) => {
    setPassword(event.target.value);
  };

  const collectData = async (event) => {
    event.preventDefault();
    if (!name || !email || !password) {
      alert("Please fill in all fields.");
      return;
    } else {
      let result = await fetch("http://localhost:4000/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
        headers: {
          "Content-Type": "application/json",
          authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
        },
      });
      console.log(result);
      result = await result.json();
      console.log("result is");
      console.log(result);
      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("token", JSON.stringify(result.auth));
      navigate("/");
    }
  };

  return (
    <div className="register">
      <h1 className="each-route-top-heading">Register</h1>
      <form onSubmit={collectData}>
        <input
          className="inputBox"
          type="text"
          value={name}
          onChange={onChangingName}
          placeholder="Enter username"
          required
        />
        <input
          className="inputBox"
          type="text"
          value={email}
          onChange={onChangingEmail}
          placeholder="Enter Email"
          required
        />
        <input
          className="inputBox"
          type="text"
          value={password}
          onChange={onChangingPassword}
          placeholder="Enter password"
          required
        />
        <button className="btn btn-primary" type="submit">
          Sign up
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
