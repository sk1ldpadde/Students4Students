// Importing Link component from react-router-dom for navigation
import { Link } from "react-router-dom";
import { useState } from "react";

// Import the component for creating ads
import CreateAd from "../components/SetAds.tsx";
// Import the CSS file for styling the component
import "../css/Sidebar.css";

// The component displays the sidebar with the navigation to the dashboard, the profile and the create ad button
const Sidebar = () => {
  // State to manage the visibility of the "Create Post" overlay (initially false)
  const [showCreatePost, setShowCreatePost] = useState(false);

  return (
    <nav id="sidebar" className="bg-light">
      <div className="position-fixed">
        {/* Dashboard Card */}
        <div className="card border border-danger m-1">
          <Link to="/dashboard" className="text-black text-decoration-none">
            <div className="card-body">
              <h5 className="card-title justify-content-center">Dashboard</h5>
              <div className="d-flex justify-content-center align-items-center">
                <img
                  src="./src/assets/influencer.png"
                  alt="Dashboard-Influencer"
                  width={"80px"}
                />
              </div>
              <p>Hier findest Du alle Beiträge!</p>
            </div>
          </Link>
        </div>

        {/* Profile Card */}
        <div className="card border border-danger m-1">
          <Link to="/profil" className="text-black text-decoration-none">
            <div className="card-body">
              <h5 className="card-title justify-content-center">Profil</h5>
              <div className="d-flex justify-content-center align-items-center">
                <img
                  src="./src/assets/profile2.jpg"
                  alt="Dashboard-Influencer"
                  width={"100px"}
                />
              </div>
              <p>Hier findest Du dein Profil!</p>
            </div>
          </Link>
        </div>

        {/* Create Post Card */}
        <div className="card border border-danger m-1">
          <div className="m-1 d-flex justify-content-center align-items-center">
            <div>
              {/* Conditional rendering of create post overlay */}
              {showCreatePost && (
                <div className="overlay">
                  <div className="create-post-container">
                    <button
                      className="close-create-post-button"
                      onClick={() => setShowCreatePost(false)}
                    >
                      <i className="fas fa-times"></i>
                    </button>
                    {/* Render the CreateAd component */}
                    <CreateAd />

                    <button
                      className="close-create-post-button inside-create-post"
                      onClick={() => setShowCreatePost(false)}
                    >
                      X
                    </button>
                  </div>
                </div>
              )}
              {/* Button to trigger create post overlay */}
              <button
                className="btn btn-danger m-2"
                onClick={() => setShowCreatePost(true)}
              >
                Beitrag erstellen
              </button>
              <div className="d-flex justify-content-center align-items-center">
                <img
                  src="./src/assets/profile.jpg"
                  alt="Dashboard-Influencer"
                  width={"100px"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
