import { useEffect } from "react";
// Importing the CSS files for styling the NavbarLogin component
import "../css/App.css";
import "../css/NavbarLogin.css";
import "../components/Offcanvas-navbar.tsx";

// Navbar component for the login/registration page
function NavbarLogin() {
  // Function to update the Navbar class based on window width
  function updateNavbarClass() {
    const navbar = document.querySelector(".navbar");
    const mediaQuery = window.matchMedia("(min-width: 1000px)");

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

  return (
    <nav
      className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark"
      aria-label="Main navigation"
    >
      <div className="container-fluid">
        <a
          className="navbar-brand activate company-logo text-dark font-weight-bold"
          aria-current="page"
          href="/"
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
                  href="/registration"
                >
                  <div className="p-3 bg-dark text-light rounded navbar-elem">
                    Registrierung
                  </div>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/login">
                  <div className="p-3 bg-dark text-light rounded navbar-elem">
                    Login
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavbarLogin;
