import { useState, useEffect } from "react";
// Import component for the offcanvas navbar for the mobile view of the website
import "../components/Offcanvas-navbar.tsx";
// Import the logout button component and the create ad component
import LogoutButton from "../components/LogoutButton";
import CreateAd from "../components/SetAds.tsx";
// Import css files for the navbar and the offcanvas navbar
import "../css/App.css";
import "../css/Navbar.css";

// The component creates the navbar for the website and the offcanvas navbar for the mobile view of the website when the user is logged in and the user is able to navigate to the dashboard, the profile page, the create ad page and the logout button
function Navbar() {
  // Function to update the Navbar class based on window width
  function updateNavbarClass() {
    const navbar = document.querySelector(".navbar");
    const mediaQuery = window.matchMedia("(min-width: 1400px)");

    if (navbar) {
      if (mediaQuery.matches) {
        navbar.classList.add("navbar-expand-lg");
        navbar.setAttribute("data-bs-responsive", "false");
      } else {
        navbar.classList.remove("navbar-expand-lg");
        navbar.setAttribute("data-bs-responsive", "true");
      }
    }
  }

  // Effect hook to run the updateNavbarClass function on component mount and window resize
  useEffect(() => {
    updateNavbarClass();

    window.addEventListener("resize", updateNavbarClass);

    return () => {
      window.removeEventListener("resize", updateNavbarClass);
    };
  }, []);

  // State to manage the visibility of the "Create Post" overlay
  const [showCreatePost, setShowCreatePost] = useState(false);

  return (
    <nav
      className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark"
      aria-label="Main navigation"
    >
      <div className="container-fluid">
        <a
          className="navbar-brand activate company-logo text-dark font-weight-bold"
          aria-current="page"
          href="/dashboard"
        >
          <img
            src="./src/assets/dhbw.png"
            alt="Logo der DHBW"
            width="30"
            height="24"
            className="d-inline-block align-text-top margin-right"
          />
          <span>Students4Students</span>
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#navbarOffcanvasLg"
          aria-controls="navbarOffcanvasLg"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="offcanvas offcanvas-end container bg-dark"
          tabIndex={-1}
          id="navbarOffcanvasLg"
          aria-labelledby="navbarOffcanvasLgLabel"
        >
          <div className="offcanvas-header">
            <h5
              className="offcanvas-title text-light"
              id="navbarOffcanvasLgLabel"
            >
              Navigations-Menü
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body justify-content-end">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="/dashboard"
                >
                  <div className="p-3 bg-dark text-light rounded navbar-element">
                    Dashboard
                  </div>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/profil">
                  <div className="p-3 bg-dark text-light rounded navbar-element">
                    Profil
                  </div>
                </a>
              </li>

              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#"
                  onClick={() => setShowCreatePost(true)}
                >
                  <div className="p-3 bg-dark text-light rounded navbar-element">
                    Beitrag erstellen
                  </div>
                  {showCreatePost && (
                    <div className="overlay">
                      <div className="create-post-container">
                        <button
                          className="close-create-post-button"
                          onClick={() => setShowCreatePost(false)}
                        >
                          <i className="fas fa-times"></i>
                        </button>
                        <CreateAd />
                        <button
                          className="close-create-post-button inside-create-post"
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent event propagation to parent elements
                            setShowCreatePost(false);
                          }}
                        >
                          X
                        </button>
                      </div>
                    </div>
                  )}
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/profil">
                  <div className="p-3 bg-dark text-light rounded navbar-element">
                    Impressum
                  </div>
                </a>
              </li>

              <li className="nav-link">
                <LogoutButton />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
