import React, { lazy, useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import privateRoutes from "./PrivateRoute";
import RequireAuth from "./RequireAuth";
import Footer from "../component/layout/footer/Footer";
import Layout from "../component/layout/Layout";
import Privacypolicy from "../component/privacypolicy/Privacypolicy";
import TermsAndConditions from "../component/terms_conditions/temsConditions";

const UpcomingSessionList = lazy(() =>
  import("../component/auction-session/upcoming-session/UpcomingSessionList")
);
const UpcomingSessionDetail = lazy(() =>
  import("../component/auction-session/upcoming-session/UpcomingSessionDetail")
);
const UpcomingSessionLot = lazy(() =>
  import("../component/auction-session/upcoming-session-lot/UpcomingSessionLot")
);
const LiveSessionList = lazy(() =>
  import("../component/auction-session/live-session/LiveSessionList")
);
const PastSessionDetail = lazy(() =>
  import("../component/auction-session/past-session/PastSessionDetail")
);
const PastSessionList = lazy(() =>
  import("../component/auction-session/past-session/PastSessionList")
);
const Header = lazy(() => import("../component/layout/header/Header"));
const Home = lazy(() => import("../component/home/Home"));
const NotFound = lazy(() => import("../views/NotFound"));
const Login = lazy(() => import("../component/auth/login/Login"));
const Register = lazy(() => import("../component/auth/register/Register"));
const Selling = lazy(() => import("../component/selling/Selling"));
const Delivery = lazy(() => import("../component/delivery/Delivery"));
const ContactInfo = lazy(() => import("../component/contact/ContactInfo"));

const AppRoute = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("account"));
    if (user) {
      setUser(user);
    }
  }, []);

  return (
    <>
      <Layout>
        <Header />
        <main style={{ paddingTop: "90px" }}>
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />

            {/* Private Routes */}
            <Route element={<RequireAuth />}>
              {user !== null &&
                privateRoutes.map((route, index) => (
                  <Route
                    key={index}
                    path={`${route.path}`}
                    element={route.element}
                  />
                ))}
            </Route>

            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<Register />} />
            <Route path="/upcoming" element={<UpcomingSessionList />} />
            <Route path="/live" element={<LiveSessionList />} />
            <Route
              path="/upcoming-session-detail/:id"
              element={<UpcomingSessionDetail />}
            />
            <Route path="/privacy-policy" element={<Privacypolicy />} />
            <Route path="/terms-conditions" element={<TermsAndConditions />} />

            <Route
              path="/upcoming-session-lot/:lotId"
              element={<UpcomingSessionLot />}
            />
            <Route path="/past" element={<PastSessionList />} />
            <Route
              path="/past-session-detail/:id"
              element={<PastSessionDetail />}
            />
            <Route path="/delivery" element={<Delivery />} />
            <Route path="/selling" element={<Selling />} />
            <Route path="/contact" element={<ContactInfo />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </Layout>
    </>
  );
};

export default AppRoute;
