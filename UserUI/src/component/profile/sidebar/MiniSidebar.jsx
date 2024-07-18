import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import "./profile-sidebar.scss";

const navigation = {
  profile: {
    title: "Profile Information",
    link: "/profile",
  },
  valuationRequest: {
    title: "My Valuation Request",
    link: "/profile/valuation-request",
  },
  changePassword: {
    title: "Change Password",
    link: "/profile/change-password",
  },
  financialProof: {
    title: "Financial Proof",
    link: "/profile/financial-proof",
  },
};

const MiniSidebar = ({ onMobileClose, openMobile }) => {
  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  return (
    <>
      <div className=" border-bottom mb-3 d-flex d-md-none">
        <ul
          className="nav nav-tabs card-header-tabs nav-gap-x-1"
          role="tablist"
        >
          <li className="nav-item">
            <Link
              to={navigation.profile.link}
              data-toggle="tab"
              className={
                location.pathname === navigation.profile.link
                  ? "nav-link has-icon active"
                  : "nav-link has-icon"
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="#B23842"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-user"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx={12} cy={7} r={4} />
              </svg>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to={navigation.valuationRequest.link}
              data-toggle="tab"
              className={
                location.pathname === navigation.valuationRequest.link
                  ? "nav-link has-icon active"
                  : "nav-link has-icon"
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="main-grid-item-icon me-3"
                fill="none"
                stroke="#B23842"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              >
                <line x1="22" x2="11" y1="2" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to={navigation.changePassword.link}
              data-toggle="tab"
              className={
                location.pathname === navigation.changePassword.link
                  ? "nav-link has-icon active"
                  : "nav-link has-icon"
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="#B23842"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-lock"
              >
                <rect x={3} y={11} width={18} height={11} rx={2} ry={2} />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to={navigation.financialProof.link}
              data-toggle="tab"
              className={
                location.pathname === navigation.financialProof.link
                  ? "nav-link has-icon active"
                  : "nav-link has-icon"
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="#B23842"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-file-text"
              >
                <path d="M14 2H2v20h20V8l-8-6z" />
                <path d="M14 2v6h6" />
              </svg>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default MiniSidebar;
