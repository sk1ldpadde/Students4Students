import React, { useEffect, useState } from "react";
// Import components to use them in the dashboard
import Login from "./Login";
import Navbar from "../layout/Navbar.tsx";
import GetAds from "../components/GetAds.tsx";
import Footer from "../layout/Footer.tsx";
import Sidebar from "../layout/Sidebar.tsx";
// Import css files for styling the dashboard
import "../css/Dashboard.css";
import "../css/App.css";

// The component creates the dashboard for the website and the user is able to navigate to the profile page and the create ad page
const Dashboard: React.FC = () => {
  // Retrieve the token of the logged in user from the local storage
  const token = localStorage.getItem("token");
  // State to manage the reload message visibility
  const [reloadMessage, setReloadMessage] = useState(false);

  // Effect to handle scroll events and trigger page reload when scrolling to the top
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setReloadMessage(true);
        //If the user has scrolled to the top, show the reload message
        window.location.reload();
      } else {
        // If not at the top, hide the reload message
        setReloadMessage(false);
      }
    };

    // Adding a scroll event listener
    window.addEventListener("scroll", handleScroll);

    return () => {
      // Entfernen Sie den Event-Listener, wenn die Komponente unmontiert wird
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!token) {
    return <Login />;
  }

  return (
    <>
      <div className="feed-background">
        <Navbar />
        <div className="d-flex align-items-center justify-content-center">
          {reloadMessage && (
            <output className="spinner-border mt-5">
              <span className="visually-hidden">Loading...</span>
            </output>
          )}
        </div>

        <div className="dashboard-container mt-4">
          <div className="sidebar">
            <Sidebar />
          </div>
          <div className="main-content">
            <GetAds />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
