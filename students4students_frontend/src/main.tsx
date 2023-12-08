// Importing React and ReactDOM modules for rendering the application
import React from "react";
import ReactDOM from "react-dom/client";
// Importing the main App component
import App from "./App.tsx";
// Importing stylesheets for styling, including DaisyUI, Tailwind CSS, and Bootstrap
import "daisyui/dist/full.css";
import "tailwindcss/tailwind.css";
import "bootstrap/dist/css/bootstrap.css";

// Rendering the application inside the specified root element with React.StrictMode enabled
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* Wrapping the App component with React.StrictMode for additional runtime checks */}
    <App />
  </React.StrictMode>
);
