import Navbar from "../layout/NavbarLogin.tsx";
import { Link } from "react-router-dom";
import "../css/ErrorPage.css"; // Import css modules stylesheet as styles
import Footer from "../layout/Footer.tsx";

// The component displays the error page when a page is not found (404)
const ErrorPage = () => {
  return (
    <>
      <Navbar />
      <div className="height-error-page">
        <div className="error-page">
          <h1>404 - Seite nicht gefunden</h1>
          <p>Die von Ihnen gesuchte Seite existiert nicht.</p>
          <Link to="/">Zurück zur Startseite</Link>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ErrorPage;
