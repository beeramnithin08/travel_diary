import "bootstrap/dist/css/bootstrap.min.css";

import {Link} from 'react-router-dom'

const ProfileComponent = () => (
  <div className="profile-container">
      <div className="top-section pt-5 pb-5">
            <div className="container">
                <div class="row">
                    <div className="col-12 col-md-8">
                        <div className="image-container">
                            <img src="https://letsgosunshine.com/wp-content/uploads/2021/05/Travel-Diary-scaled.jpg" alt="image" className="shadow home-image" />
                        </div>
                    </div>
                    <div className="col-12 col-md-4 top-section-heading-container">
                        <h1 className="top-section-heading">Where every page holds a piece of the world <img src="https://i.ibb.co/mS0FhW0/smile-removebg-preview-1.png" alt="image" className="smily-image" /></h1>
                        <Link to="/entries"><button className="btn btn-success custom-button" id="custom-button">
                            View my Travel Entries
                        </button></Link>
                    </div>
                </div>
            </div>
        </div>
  </div>
);

export default ProfileComponent;
