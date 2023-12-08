import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { hashPassword } from "../logic/SECURITY_PasswordHashing";
import NavbarLogin from "../layout/NavbarLogin.tsx";
import Footer from "../layout/Footer.tsx";
import BackendAPI from "../logic/API_BackendCommunication.tsx";
// Import css files for styling the dashboard
import "../css/App.css";

// Interface defining the structure of the login form
interface FormLogin {
  email: string;
  password: string;
}

// Login component for handling user login
const Login: React.FC = () => {
  // State to manage form input data
  const [formLogin, setFormLogin] = React.useState<FormLogin>({
    email: "",
    password: "",
  });

  // Hook for navigation
  const navigate = useNavigate();

  // Handler for form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormLogin((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handler for form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Hashing the password before sending it to the backend
    formLogin.password = hashPassword(formLogin.password);

    // Simulate the login process and check if login is successful
    const loginSuccessful = await BackendAPI.sendObjectDataToBackend<FormLogin>(
      formLogin,
      BackendAPI.LOGIN_URL
    );

    // If login is successful, update local storage and navigate to dashboard
    if (loginSuccessful.code === 0) {
      console.log("Login erfolgreich!");
      localStorage.setItem("email", formLogin.email);
      localStorage.setItem("token", loginSuccessful.token);
      navigate("/dashboard");
    } else {
      // If login is unsuccessful, display an alert with the error message
      alert(loginSuccessful.message);
    }
  };

  // Fetch user data upon component mount using the email from local storage
  const email = localStorage.getItem("email");
  useEffect(() => {
    if (email) {
      fetch(`http://localhost:8000/students4students/user?email=${email}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          const userId = data[0].id;
          localStorage.setItem("userId", userId);
          const username = data[0].username;
          localStorage.setItem("username", username);
        })
        .catch((error) => {
          console.error("Fehler beim Abrufen der Benutzerdaten:", error);
        });
    }
  }, [email]);

  return (
    <>
      <NavbarLogin />
      <section id="about" className="py-5 reg-background mt-5">
        <div className="full-height ">
          <div className="container">
            <div className="card">
              <h1 className="card-header">Login</h1>
              <form onSubmit={handleSubmit}>
                {/* Email input */}
                <div className="form-group p-3">
                  <label htmlFor="exampleInputEmail1">E-Mail</label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="inf*****@lehre.dhbw-stuttgart.de"
                    value={formLogin.email}
                    onChange={handleChange}
                    name="email"
                  />
                </div>
                {/* Password input */}
                <div className="form-group p-3">
                  <label htmlFor="exampleInputPassword1">Passwort</label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="********"
                    value={formLogin.password}
                    onChange={handleChange}
                    name="password"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="btn btn-outline-danger container mt-3"
                >
                  Einloggen
                </button>
              </form>
              <p className="mt-3 m-2">
                Noch kein Konto? <a href="/registration">Registrierung</a>
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Login;
