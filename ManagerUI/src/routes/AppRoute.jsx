import { lazy, useContext, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Login from "../component/auth/login/Login.jsx";
import Register from "../component/auth/register/Register.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import Account from "../component/account/Account.jsx";
import FullLayout from "../layouts/full-layout/FullLayout.jsx";
import StaffRoutes from "./StaffRoutes.jsx";
import ManagerRoutes from "./ManagerRoutes.jsx";
import AddLotToSession from "../component/manager/Session/AddLotToSession.jsx";

const Home = lazy(() => import("../layouts/home/Home.jsx"));

const AppRoute = () => {
  const { user } = useContext(UserContext);

  return (
    <Routes>
      <Route path="/" element={<PrivateRoute />}>
        <Route element={<FullLayout />}>
          {user.role === "STAFF" &&
            StaffRoutes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          {user.role === "MANAGER" &&
            ManagerRoutes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Account />} />
        </Route>
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<Register />} />
      <Route path="/add-session/:lotId" element={<AddLotToSession />} />
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
};

export default AppRoute;
