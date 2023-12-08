import { useState, useEffect } from "react";
// Import the components for the registration page
import NavbarLogin from "../layout/NavbarLogin.tsx";
import BackendAPI from "../logic/API_BackendCommunication";
import { User } from "../logic/API_Classes";
import Footer from "../layout/Footer.tsx";
import { hashPassword } from "../logic/SECURITY_PasswordHashing";
import "../css/App.css";

// Interface defining the structure of the registration form
type DataItem = {
  id: number;
  name: string;
  faculty: number;
};

// Registration component for handling user registration process and displaying the registration form
function Registration() {
  // State for storing user registration form data
  const [formData, setFormData] = useState<User>({
    email: "",
    password: "",
    username: "",
    first_name: "",
    surname: "",
    age: "",
    degree: "",
    semester: "",
    partner_company: "",
  });

  // Function to handle changes in the form inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      formData.email === "" ||
      formData.password === "" ||
      formData.username === "" ||
      formData.first_name === "" ||
      formData.surname === "" ||
      formData.age === "" ||
      formData.degree === "" ||
      formData.semester === "" ||
      formData.partner_company === ""
    ) {
      alert("Bitte fülle alle Felder aus!");
      return;
    }
    try {
      // Hashing the user password before sending it to the backend
      formData.password = hashPassword(formData.password);
      // Sending user registration data to the backend for verification
      const result = await BackendAPI.sendObjectDataToBackend<User>(
        formData,
        BackendAPI.REGISTRATION_URL
      );
      // Handling the result of the registration attempt
      if (result.code === 1) {
        // If registration is successful, store email and show additional registration code verification
        localStorage.setItem("email", formData.email);
        setShowCreatePost(true);
      } else {
        // If registration fails, show an alert with the error message
        alert(result.message);
      }
    } catch (error) {
      console.error("Fehler beim Senden der Anfrage:", error);
    }
  };

  // State for storing degree data fetched from the backend
  const [data, setData] = useState<DataItem[]>([]);
  // State for controlling the display of additional registration code verification
  const [showCreatePost, setShowCreatePost] = useState(false);

  // Function to fetch degree data from the backend
  const fetchData = async () => {
    try {
      const result = await BackendAPI.getDataFromBackend(
        BackendAPI.DEGREE_INFO_URL
      );
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // useEffect hook to fetch degree data once the component is mounted
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <NavbarLogin />
      {/* Conditional rendering of RegisterCode component based on showCreatePost state */}
      {showCreatePost && (
        <div className="overlay">
          <div className="create-post-container">
            <div className="alert alert-info" role="alert">
              Bitte folge dem Link in deinen E-Mails!
            </div>
            <button
              className="btn btn-success"
              onClick={() => setShowCreatePost(false)}
            >
              Verstanden!
            </button>
          </div>
        </div>
      )}

      {/* Registration form section */}
      <section id="about" className="py-5 reg-background mt-3">
        <div className="container">
          <div className="card">
            <div className="card-header">
              <h1 className="mb-0">Registrierung</h1>
            </div>
            {/* Registration form */}
            <form onSubmit={handleSubmit} className="p-3">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="inputEmail4">E-Mail</label>
                  <input
                    type="email"
                    className="form-control"
                    id="inputEmail4"
                    placeholder="inf*****@lehre.dhbw-stuttgart.de"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="inputPassword4">Passwort</label>
                  <input
                    type="password"
                    className="form-control"
                    id="inputPassword4"
                    placeholder="********"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="inputUsername">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputUsername"
                  placeholder="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="inputFirstname">Vorname</label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputFirstname"
                    placeholder="Klaus"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="inputSurname">Nachname</label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputSurname"
                    placeholder="Mustermann"
                    name="surname"
                    value={formData.surname}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="inputAge">Alter</label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputAge"
                    placeholder="20"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="inputDegree">Studiengang</label>
                  <select
                    className="form-control"
                    id="inputDegree"
                    name="degree"
                    value={formData.degree}
                    onChange={handleChange}
                  >
                    <option value="">Bitte auswählen</option>
                    {data.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="inputSemester">Semester</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputSemester"
                  placeholder="1"
                  name="semester"
                  value={formData.semester}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="inputPartnerCompany">Partner Unternehmen</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputPartnerCompany"
                  placeholder="Mercedes-Benz AG"
                  name="partner_company"
                  value={formData.partner_company}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="btn btn-outline-danger">
                Registrierung
              </button>
            </form>
          </div>
        </div>
      </section>
      {/* Footer component for the page footer */}
      <Footer />
    </>
  );
}

export default Registration;
