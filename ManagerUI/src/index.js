import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Router } from "react-router-dom";
import { UserProvider } from "./context/UserContext.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root
  .render
  // <React.StrictMode>
  //   <Router>
  //     <App />
  //   </Router>
  // </React.StrictMode>
  ();
