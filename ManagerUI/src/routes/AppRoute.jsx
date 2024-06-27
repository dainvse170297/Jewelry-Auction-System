import { lazy, useContext, useEffect, useState } from "react";
import { Navigate, Route, Routes, useRoutes } from "react-router-dom";
import Login from "../component/auth/login/Login.jsx";
import Register from "../component/auth/register/Register.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import Account from "../component/account/Account.jsx";
/****Layouts*****/
import FullLayout from "../layouts/full-layout/FullLayout.jsx";

/*****Routes of each protected role******/
import StaffRoutes from "./StaffRoutes.jsx";
import ManagerRoutes from "./ManagerRoutes.jsx";
/***** Pages ****/

const Home = lazy(() => import("../layouts/home/Home.jsx"));

/*****Routes******/

const AppRoute = (props) => {
  const [user, setUser] = useState({
    name: sessionStorage.getItem("name"),
    role: sessionStorage.getItem("role"),
  });

  console.log("User:", user);

  return (
    <>
      <Routes>
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<FullLayout />}>
            {user &&
              user.role === "STAFF" &&
              StaffRoutes.map((route, index) => (
                <Route
                  key={index}
                  path={`${route.path}`}
                  element={route.element}
                />
              ))}
            {user && user.role === "MANAGER" && (
              <>
                {ManagerRoutes.map((route, index) => (
                  <Route
                    key={index}
                    path={`${route.path}`}
                    element={route.element}
                  />
                ))}
              </>
            )}
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Account />} />
          </Route>
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Register />} />
        {/* <Route path="/account" element={<Account />} /> */}

        <Route path="/*">404 Not Found</Route>
      </Routes>
    </>
  );
};

export default AppRoute;
