// Importing the CSS file for styling the Footer component
import "../css/Footer.css";

// Footer component representing the page footer
const Footer: React.FC = () => {
  return (
    <>
      <div className="bg-white hide-over-1400">
        <div className="container">
          <footer className="d-flex flex-wrap justify-content-center align-items-center py-3 my-4 border-top">
            <div className="">
              <div className=" d-flex align-items-center justify-content-center mb-3 mb-md-0 ">
                <a
                  href="/"
                  className="d-flex align-items-center link-body-emphasis text-decoration-none"
                >
                  <img
                    src="../src/assets/dhbw.png"
                    className="d-inline-block align-text-top"
                    alt="Logo der DHBW"
                    width={"30"}
                    height={"24"}
                  />
                  <span className="fs-5">Students4Students</span>
                </a>
              </div>
            </div>
          </footer>
        </div>
      </div>

      <div className="bg-white hide-below-1400">
        <div className="container">
          <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
            <p className="col-md-4 col-12 mb-0 text-body-secondary">
              &copy; 2023
            </p>

            <div className="">
              <div className="col-md-4 col-12 d-flex align-items-center justify-content-center mb-3 mb-md-0 ">
                <a
                  href="/"
                  className="d-flex align-items-center link-body-emphasis text-decoration-none"
                >
                  <img
                    src="../src/assets/dhbw.png"
                    alt="Logo der DHBW"
                    width="50"
                    height="54"
                    className="d-inline-block align-text-top"
                  />
                  <span className="fs-5">Students4Students</span>
                </a>
              </div>
            </div>

            <ul className="nav col-md-4 col-12 justify-content-end">
              <li className="nav-item">
                <a href="/" className="nav-link px-2 text-body-secondary">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link px-2 text-body-secondary">
                  Impressum
                </a>
              </li>
            </ul>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Footer;
