import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const ProfileComponent = () => (
  <div className="profile-container">
    <div className="container">
      <div className="row entire-container">
        <div className="col-12 col-md-8 mb-4 mb-md-0">
          <div className="image-container">
            <img
              src="https://letsgosunshine.com/wp-content/uploads/2021/05/Travel-Diary-scaled.jpg"
              alt="Travel Diary"
              className="shadow home-image img-fluid"
            />
          </div>
        </div>
        <div className="col-12 col-md-4 ">
          <div className="top-section-heading-container">
            <h1 className="top-section-heading">
              Where every page holds a piece of the world
              <img
                src="https://i.ibb.co/mS0FhW0/smile-removebg-preview-1.png"
                alt="Smiley"
                className="smily-image img-fluid"
              />
            </h1>
            <Link to="/entries">
              <button className="btn btn-success" id="custom-button">
                View my Travel Entries
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ProfileComponent;
