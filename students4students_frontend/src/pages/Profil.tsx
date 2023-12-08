import React, { useState } from "react";
// Import components for the profile page
import ProfilDatas from "../components/ProfilDatas";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import Sidebar from "../layout/Sidebar";
import Favorites from "../components/Favorites";
import UserAds from "../components/UserAds";
import "../css/Profil.css";

// The component creates the profile page and the user is able to navigate to the profile page and the create ad page
const ProfileTabs: React.FC = () => {
  // State for managing the active tab
  const [activeTab, setActiveTab] = useState("profile");

  // Function to handle tab change
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <>
      <div className="feed-background">
        <Navbar />
        <div className="dashboard-container mt-4">
          <div className="sidebar">
            <Sidebar />
          </div>
          <div className="main-content">
            <div className="profile-tabs-container">
              <div className="profile-tabs">
                <button
                  className={`profile-tab ${activeTab === "posts" && "active"}`}
                  onClick={() => handleTabChange("posts")}
                >
                  Meine Beiträge
                </button>
                <button
                  className={`profile-tab ${
                    activeTab === "profile" && "active"
                  }`}
                  onClick={() => handleTabChange("profile")}
                >
                  Konto Informationen
                </button>
                <button
                  className={`profile-tab ${activeTab === "liked" && "active"}`}
                  onClick={() => handleTabChange("liked")}
                >
                  Gelikte Beiträge
                </button>
              </div>
              <div className="profile-content">
                {activeTab === "profile" && <ProfilDatas />}
                {activeTab === "liked" && <Favorites />}
                {activeTab === "posts" && <UserAds />}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfileTabs;
