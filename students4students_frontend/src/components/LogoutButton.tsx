import React from "react";
import { useNavigate } from "react-router-dom";

// Component to log out the user and delete the token from the local storage to prevent the user from accessing the protected routes without being logged in
const LogoutButton: React.FC = () => {
  // Navigate to the login page after the user has logged out
  const navigate = useNavigate();

  // Function to log out the user and delete the token from the local storage and navigate to the login page
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.clear();
    navigate("/login");
  };

  return (
    <button type="button" className="btn btn-light" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
