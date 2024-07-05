import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";
import AppRoute from "./routes/AppRoute.jsx";
import { UserProvider } from "./context/UserContext.jsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Suspense>
    <UserProvider>
      <BrowserRouter>
        <AppRoute />
      </BrowserRouter>
    </UserProvider>
  </Suspense>
  // </React.StrictMode>
);
