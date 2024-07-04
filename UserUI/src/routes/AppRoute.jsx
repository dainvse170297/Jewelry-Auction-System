import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Selling from "../component/selling/Selling";
import UpcomingSessionDetail from "../component/auction-session/upcoming-session/UpcomingSessionDetail";
import LiveSessionList from "../component/auction-session/live-session/LiveSessionList";
import PastSessionList from "../component/auction-session/past-session/PastSessionList";
import PastSessionDetail from "../component/auction-session/past-session/PastSessionDetail";
import Header from "../component/layout/header/Header";
import privateRoutes from "./PrivateRoute";
import Home from "../component/home/Home";
import NotFound from "../views/NotFound";

const AppRoute = (props) => {
  const [user, setUser] = useState({});

  console.log("User:", user);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("account"));
    setUser(user);
  }, []);

  return (
    <>
      <Header />
      <div style={{ paddingTop: "70px" }}>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          {user &&
            privateRoutes.map((route) => (
              <Route path={`${route.path}`} element={route.element} />
            ))}
          <Route path="/selling" element={<Selling />} />
          <Route path="/live" element={<LiveSessionList />} />
          <Route
            path="/upcoming-session-detail/:id"
            element={<UpcomingSessionDetail />}
          />
          <Route path="/past" element={<PastSessionList />} />
          <Route
            path="/past-session-detail/:id"
            element={<PastSessionDetail />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
};
export default AppRoute;
