import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

const EntryForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const onAddingEntry = async () => {
    if (!title || !description || !date || !location || !imageUrl) {
      setError(true);
      return;
    }

    const userId = JSON.parse(localStorage.getItem("user"))._id;
    let result = await fetch("http://localhost:4000/add-entry", {
      method: "POST",
      body: JSON.stringify({ title, description, date, location, imageUrl, userId }),
      headers: {
        "Content-Type": "application/json",
        authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
      },
    });

    result = await result.json();
    console.log(result);
    navigate("/entries");
  };

  return (
    <div className="entry">
      <h1 className="each-route-top-heading">Add Entry</h1>
      <input
        type="text"
        placeholder="Enter Entry title"
        className="inputBox"
        value={title}
        onChange={(event) => {
          setTitle(event.target.value);
        }}
      />
      {error && !title && <span className="invalid-text">enter valid title</span>}
      <input
        type="text"
        placeholder="Enter entry description"
        className="inputBox"
        value={description}
        onChange={(event) => {
          setDescription(event.target.value);
        }}
      />
      {error && !description && (
        <span className="invalid-text">enter valid description</span>
      )}
      <input
        type="text"
        placeholder="Enter entry date"
        className="inputBox"
        value={date}
        onChange={(event) => {
          setDate(event.target.value);
        }}
      />
      {error && !date && <span className="invalid-text">enter valid date</span>}
      <input
        type="text"
        placeholder="Enter entry location"
        className="inputBox"
        value={location}
        onChange={(event) => {
          setLocation(event.target.value);
        }}
      />
      {error && !location && (
        <span className="invalid-text">enter valid location</span>
      )}
      <input
        type="text"
        placeholder="Enter entry imageUrl"
        className="inputBox"
        value={imageUrl}
        onChange={(event) => {
          setImageUrl(event.target.value);
        }}
      />
      {error && !imageUrl && (
        <span className="invalid-text">enter valid imageUrl</span>
      )}
      <button type="button" className="btn btn-success" onClick={onAddingEntry}>
        Add Entry
      </button>
    </div>
  );
};

export default EntryForm;
