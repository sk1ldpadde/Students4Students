import React from "react";
import { Navigate } from "react-router-dom";

// Component to protect routes from being accessed without being logged in by checking if the token is present in the local storage and navigating to the login page if not
const PrivateRoute: React.FC<{ element: React.ReactElement }> = ({
  element,
}) => {
  const token = localStorage.getItem("token");

  return token ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
