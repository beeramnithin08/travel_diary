import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateEntry = () => {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [date, setDate] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");
  const params = useParams();
  const navigate = useNavigate();

  const getEntryDetails = async () => {
    try {
      let result = await fetch(`http://localhost:4000/entry/${params.id}`, {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      result = await result.json();
      setTitle(result.title || "");
      setDescription(result.description || "");
      setDate(result.date || "");
      setLocation(result.location || "");
      setImageUrl(result.imageUrl || "");
    } catch (error) {
      console.error("Error fetching entry details:", error);
    }
  };

  useEffect(() => {
    getEntryDetails();
  }, [params.id]);

  const onUpdatingEntry = async () => {
    console.log(title, description, date, location, imageUrl);
    try {
      let result = await fetch(`http://localhost:4000/entry/${params.id}`, {
        method: "PUT",
        body: JSON.stringify({ title, description, date, location, imageUrl }),
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      result = await result.json();
      console.log(result);
      navigate("/entries");
    } catch (error) {
      console.error("Error updating entry:", error);
    }
  };

  return (
    <div className="entry">
      <h1 className="each-route-top-heading">Update Entry</h1>
      <input
        type="text"
        placeholder="Enter entry title"
        className="inputBox"
        value={title}
        onChange={(event) => {
          setTitle(event.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Enter entry description"
        className="inputBox"
        value={description}
        onChange={(event) => {
          setDescription(event.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Enter entry date"
        className="inputBox"
        value={date}
        onChange={(event) => {
          setDate(event.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Enter entry location"
        className="inputBox"
        value={location}
        onChange={(event) => {
          setLocation(event.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Enter entry imageUrl"
        className="inputBox"
        value={imageUrl}
        onChange={(event) => {
          setImageUrl(event.target.value);
        }}
      />
      <button type="button" className="btn btn-success" onClick={onUpdatingEntry}>
        Update Entry
      </button>
    </div>
  );
};

export default UpdateEntry;
