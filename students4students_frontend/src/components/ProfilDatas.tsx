import React, { useState, useEffect } from "react";
// Import of the css files
import "../css/UserView.css";
import "../css/App.css";
import "../css/Profil.css";

// Component to display the user profile data on the profile page of the user
const UserView: React.FC = () => {
  // Define the type of the user data retrieved from the API
  interface UserData {
    email: "";
    password: "";
    username: "";
    first_name: "";
    surname: "";
    age: "";
    degree: "";
    semester: "";
    partner_company: "";
  }

  // Initialize the state variable for the user data
  const [userData, setUserData] = useState<UserData | null>(null);
  // Retrieve the email of the logged in user from the local storage
  const email = localStorage.getItem("email");

  // Fetch the data from the API when the component is first rendered
  useEffect(() => {
    // API call with email to find and output a specific user with the logged in user email address
    const apiUrl = `http://localhost:8000/students4students/user?email=${email}`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setUserData(data[0]);
      })
      .catch((error) => {
        console.error("Fehler beim Abrufen der Nutzerdaten:", error);
      });
  }, [email]);

  // Function to get the degree name by its id and show the name instead of the id
  const getDegreeNameById = (degreeId: number) => {
    switch (degreeId) {
      case 1:
        return "BWL-Bank";
      case 2:
        return "BWL-Digital Business Management";
      case 3:
        return "BWL-Digital Commerce Management";
      case 4:
        return "BWL-Dienstleistungsmanagement Schwerpunkt Consulting & Sales";
      case 5:
        return "BWL-Dienstleistungsmanagement Schwerpunkt International Services Management";
      case 6:
        return "BWL-Dienstleistungsmanagement Schwerpunkt Logistik- und Supply Chain Management";
      case 7:
        return "BWL-Dienstleistungsmanagement Schwerpunkt Media, Vertrieb und Kommunikation (MVK)";
      case 8:
        return "BWL-Dienstleistungsmanagement Schwerpunkt Non-Profit-Organisationen, Verbände und Stiftungen";
      case 9:
        return "BWL-Dienstleistungsmanagement Schwerpunkt Sportmanagement";
      case 10:
        return "BWL-Finanzdienstleistungen";
      case 11:
        return "BWL-Gesundheits­management";
      case 12:
        return "BWL-Handel";
      case 13:
        return "BWL-Handwerk";
      case 14:
        return "BWL-Immobilienwirtschaft";
      case 15:
        return "BWL-Industrie";
      case 16:
        return "BWL-International Business";
      case 17:
        return "BWL-Versicherung";
      case 18:
        return "RSW-Accounting & Controlling";
      case 19:
        return "RSW-Steuern und Prüfungswesen";
      case 20:
        return "RSW-Wirtschaftsprüfung";
      case 21:
        return "RSW-Wirtschafts- und Steuerrecht";
      case 22:
        return "Wirtschaftsinformatik-Application Management";
      case 23:
        return "RWirtschaftsinformatik-Data Science";
      case 24:
        return "Wirtschaftsinformatik-IMBIT";
      case 25:
        return "Wirtschaftsinformatik-Sales and Consulting";
      case 26:
        return "Elektrotechnik - Automation";
      case 27:
        return "Elektrotechnik - Elektronik";
      case 28:
        return "Elektrotechnik - Nachrichtentechnik";
      case 29:
        return "Embedded Systems - General Engineering";
      case 30:
        return "Informatik";
      case 31:
        return "Informatik - Informationstechnik";
      case 32:
        return "Informatik - IT-Automotive";
      case 33:
        return "Informatik - New Study (Digital Bachelor Programme)";
      case 34:
        return "Maschinenbau - Fahrzeug-System-Engineering";
      case 35:
        return "Maschinenbau - Konstruktion und Entwicklung";
      case 36:
        return "Maschinenbau - Produktionstechnik";
      case 37:
        return "Mechatronik - Allgemeine Mechatronik";
      case 38:
        return "Mechatronik - Fahrzeugsystemtechnik und Elektromobilität";
      case 39:
        return "Wirtschaftsingenieurwesen - Elektrotechnik";
      case 40:
        return "Wirtschaftsingenieurwesen - Facility Management";
      case 41:
        return "Wirtschaftsingenieurwesen - Maschinenbau";
      case 42:
        return "Soziale Arbeit";
      case 43:
        return "Angewandte Gesundheits- und Pflegewissenschaften";
      case 44:
        return "Angewandte Hebammenwissenschaft";
      case 45:
        return "Angewandte Hebammenwissenschaft - berufsintegrierend";
      case 46:
        return "Angewandte Pflegewissenschaft";
      default:
        return "Unbekannter Studiengang";
    }
  };

  return (
    <div className="main-container">
      <div className="container mt-5 user-heigth">
        {userData ? (
          <div className="cardp">
            <div className="card-body">
              <h1 className="card-title">Nutzerprofil</h1>
              <p className="card-text">Benutzername: {userData.username}</p>
              <p className="card-text">Vorname: {userData.first_name}</p>
              <p className="card-text">Nachname: {userData.surname}</p>
              <p className="card-text">E-Mail: {userData.email}</p>
              <p className="card-text">
                Studiengang: {getDegreeNameById(parseInt(userData.degree))}
              </p>
              <p className="card-text">Semester: {userData.semester}</p>
              <p className="card-text">Alter: {userData.age}</p>
            </div>
          </div>
        ) : (
          // Show a loading message if the data is not yet loaded
          <p className="mt-3">Lade Nutzerdaten...</p>
        )}
      </div>
      <section className="bottom-height"></section>
    </div>
  );
};

export default UserView;
