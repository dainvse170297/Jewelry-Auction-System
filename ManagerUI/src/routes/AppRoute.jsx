import { lazy } from "react";
import { Navigate, Route, Routes, useRoutes } from "react-router-dom";
import Login from "../component/auth/login/Login.jsx";
import Register from "../component/auth/register/Register.jsx";
import Account from "../component/account/Account.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
/****Layouts*****/
import FullLayout from "../layouts/full-layout/FullLayout.jsx";

/***** Pages ****/

const Home = lazy(() => import("../layouts/home/Home.jsx"));

/*****Routes******/

const AppRoute = (props) => {
  return (
    <>
      <Routes>
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<FullLayout />}>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
          </Route>
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/account" element={<Account />} /> */}

        <Route path="*">404 Not Found</Route>
      </Routes>
    </>
  );
};

export default AppRoute;
