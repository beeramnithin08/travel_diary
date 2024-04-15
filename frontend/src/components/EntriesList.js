import React, { Component } from "react";
import { Link } from "react-router-dom";
import Loader from 'react-loader-spinner'

import "bootstrap/dist/css/bootstrap.min.css";

class EntriesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.getEntries();
  }

  getEntries = async () => {
    this.setState({ loading: true }); 
    let result = await fetch("http://localhost:4000/entries",{
      headers:{
        authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    });
    result = await result.json();
     
    const user = localStorage.getItem('user')
    const userDetails = JSON.parse(user)
    const id=userDetails["_id"]
    console.log(result)
    const filteredData = result.filter(entry => entry.userId === id);
  
    this.setState({ entries: filteredData, loading: false }); 
  };

  onChangingSearchInput = async (event) => {
    let key = event.target.value;
    if (key) {
      this.setState({ loading: true }); 
      let result = await fetch(`http://localhost:4000/search/${key}`,{
        headers:{
        authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
      });
      result = await result.json();
      if (result) {
        this.setState({ entries: result, loading: false }); 
      }
    } else {
      this.getEntries();
    }
  };

  onDeleting = async (id) => {
    console.log(id);
    let result = await fetch(`http://localhost:4000/entry/${id}`, {
      method: "DELETE",
      headers:{
        authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    });
    result = await result.json();
    if (result) {
      this.getEntries(); 
    }
  };

  render() {
    const { entries, loading } = this.state;
    return (
      <div className="entries-list">
        <h4 className="each-route-top-heading">Entries list</h4>
        <input
          type="text"
          placeholder="search entry"
          className="search-input"
          onChange={this.onChangingSearchInput}
        />
        {loading ? ( 
          <div className="loader-container">
            <Loader type="Tailspin" color="black" height={50} width={50} />
          </div>
        ) : (
          <ul className="unordered-list">
            {entries.length > 0 ? (
              entries.map((item, index) => {
                return (
                  <li id="each-card-item" className="shadow" key={index}>
                    <div id="content-container">
                      <img src={item.imageUrl} alt={item.title} />
                      <p>
                        <span className="span-element-style">Title: </span>
                        {item.title}
                      </p>
                      <p>
                        <span className="span-element-style">Description: </span>
                        {item.description}
                      </p>
                      <p>
                        <span className="span-element-style">Date: </span>
                        {item.date}
                      </p>
                      <p>
                        <span className="span-element-style">Location: </span>
                        {item.location}
                      </p>
                    </div>
                    <div className="buttons-container">
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => this.onDeleting(item._id)}
                      >
                        Delete
                      </button>
                      <button type="button" className="btn" id="update-button">
                        <Link
                          to={`/update/${item._id}`}
                          style={{ textDecoration: "none", color: "white" }}
                        >
                          Update
                        </Link>
                      </button>
                    </div>
                  </li>
                );
              })
            ) : (
              <h1>No Results Found</h1>
            )}
          </ul>
        )}
      </div>
    );
  }
}

export default EntriesList;
