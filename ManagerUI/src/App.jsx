import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import AppRoute from "./routes/AppRoute.jsx";
import { UserProvider } from "./context/UserContext.jsx";
// import "bootstrap/dist/css/bootstrap.jsx";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <AppRoute />
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
