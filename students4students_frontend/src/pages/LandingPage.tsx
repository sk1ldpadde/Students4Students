import React from "react";
// Importing Bootstrap CSS for styling
import "bootstrap/dist/css/bootstrap.min.css";
// Importing the NavbarLogin component for the login/registration page and the Footer component
import NavbarLogin from "../layout/NavbarLogin.tsx";
import Footer from "../layout/Footer.tsx";
// Importing the CSS files for styling the LandingPage component
import "../css/LandingPage.css";
import "../css/App.css";

// LandingPage component for the landing page of the website
const LandingPage: React.FC = () => {
  return (
    <>
      <div className="custom-background cotainer">
        <NavbarLogin />
        <section id="about" className="py-5">
          <div className="container mt-3">
            <div className="row">
              <div className="col-12 col-md-6 info-bg">
                <h2 className="auffaellige-ueberschrift">
                  🎓👩🏼‍🎓Students4Students👨🏾‍🎓🎓
                </h2>
                <p className="info">
                  Wilkommen, Students4Students ist eine exklusive Community für
                  Studierende an der DHBW! Registriere dich jetzt und vernetze
                  dich mit anderen Studierenden. Profitiere von den Vorteilen
                  die diese Plattform bietet und bewältige das Studierendenleben
                  mit Links!🎓
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="services" className="py-5 bg-light">
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-4">
                <div className="card mb-4">
                  <img
                    src="../src/assets/students.jpeg"
                    className="card-img-top pic-l"
                    alt="Service 1"
                    style={{ height: "300px" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">
                      Vernetze dich mit Studierenden an der DHBW
                    </h5>
                    <p className="card-text">
                      Neue Stadt, neue Uni, neue Leute. Vernetze dich mit
                      anderen DHBW Studierenden und finde neue Freunde. Egal was
                      du suchst, hier findest du es.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="card mb-4">
                  <img
                    src="../src/assets/help_students.webp"
                    className="card-img-top pic-l"
                    alt="Service 2"
                    style={{ height: "300px" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">
                      Das Studierendenleben bereitet den meisten große
                      Challenges
                    </h5>
                    <p className="card-text">
                      Egal in welcher Lebenslage, am Stärksten ist man im Team.
                      Werde Teil der Students4Students Community und finde die
                      Hilfe die du suchst.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="card mb-4">
                  <img
                    src="../src/assets/dhbw.png"
                    className="card-img-top pic-l"
                    alt="Service 3"
                    style={{ height: "300px" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">
                      Diese Community ist ein exklusives Netzwerk{" "}
                    </h5>
                    <p className="card-text">
                      Werde Teil einer exklusiven Community in der nur
                      Studierende der DHBW Zugriff haben. Vernetze dich mit den
                      besten Köpfen der DHBW.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default LandingPage;
