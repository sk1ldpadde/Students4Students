// Importing necessary components and modules from React and react-router-dom
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Importing page components
import Dashboard from "./pages/Dashboard.tsx";
import Login from "./pages/Login.tsx";
import LandingPage from "./pages/LandingPage.tsx";
import Registration from "./pages/Registration.tsx";
import Profil from "./pages/Profil.tsx";
import NotFound from "./pages/ErrorPage.tsx";
// Importing PrivateRoute component for handling private routes
import PrivateRoute from "./components/PrivateRoute.tsx";
// Importing Bootstrap JS bundle for additional functionality
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Main App component that defines the application's routing structure and renders the corresponding components for each route path
function App() {
  return (
    // Router component to enable navigation and routing
    <Router>
      {/* Routes component to define different routes for the application */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route
          path="/dashboard"
          element={<PrivateRoute element={<Dashboard />} />}
        />
        <Route path="/profil" element={<PrivateRoute element={<Profil />} />} />
        {/* Route for handling unknown paths */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
