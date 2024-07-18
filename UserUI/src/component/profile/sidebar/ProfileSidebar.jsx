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
  auctionRegister: {
    title: "Auction Register History",
    link: "/profile/auction-register",
  },
  transactionHistory: {
    title: "Transaction History",
    link: "/profile/transaction-history",
  },
};

const ProfileSidebar = ({ onMobileClose, openMobile }) => {
  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  return (
    <>
      <nav className="nav flex-column nav-pills nav-gap-y-1">
        <Link
          to="/profile"
          data-toggle="tab"
          className={
            location.pathname === navigation.profile.link
              ? "nav-item nav-link has-icon nav-link-faded mb-1 active"
              : "nav-item nav-link has-icon nav-link-faded mb-1"
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
            className="feather feather-user mr-2 me-3"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx={12} cy={7} r={4} />
          </svg>
          <span>{navigation.profile.title}</span>
        </Link>

        <Link
          to={navigation.valuationRequest.link}
          data-toggle="tab"
          className={
            location.pathname === navigation.valuationRequest.link
              ? "nav-item nav-link has-icon nav-link-faded mb-1 active"
              : "nav-item nav-link has-icon nav-link-faded mb-1"
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
          <span>{navigation.valuationRequest.title}</span>
        </Link>

        <Link
          to="/profile/change-password"
          data-toggle="tab"
          className={
            location.pathname === navigation.changePassword.link
              ? "nav-item nav-link has-icon nav-link-faded mb-1 active"
              : "nav-item nav-link has-icon nav-link-faded mb-1"
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
            className="feather feather-shield mr-2 me-3"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <span>{navigation.changePassword.title}</span>
        </Link>

        <Link
          to={navigation.financialProof.link}
          data-toggle="tab"
          className={
            location.pathname === navigation.financialProof.link
              ? "nav-item nav-link has-icon nav-link-faded mb-1 active"
              : "nav-item nav-link has-icon nav-link-faded mb-1"
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
            className="feather feather-credit-card mr-2 me-3"
          >
            <rect x={1} y={4} width={22} height={16} rx={2} ry={2} />
            <line x1={1} y1={10} x2={23} y2={10} />
          </svg>

          <span>{navigation.financialProof.title}</span>
        </Link>

        <Link
          to={navigation.auctionRegister.link}
          data-toggle="tab"
          className={
            location.pathname === navigation.auctionRegister.link
              ? "nav-item nav-link has-icon nav-link-faded mb-1 active"
              : "nav-item nav-link has-icon nav-link-faded mb-1"
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
            <polyline points="21 8 21 21 3 21 3 8" />
            <rect height="5" width="22" x="1" y="3" />
            <line x1="10" x2="14" y1="12" y2="12" />
          </svg>

          <span>My Attend History</span>
        </Link>

        <Link
          to={navigation.transactionHistory.link}
          data-toggle="tab"
          className={
            location.pathname === navigation.transactionHistory.link
              ? "nav-item nav-link has-icon nav-link-faded mb-1 active"
              : "nav-item nav-link has-icon nav-link-faded mb-1"
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
            <polyline points="21 8 21 21 3 21 3 8" />
            <rect height="5" width="22" x="1" y="3" />
            <line x1="10" x2="14" y1="12" y2="12" />
          </svg>

          <span>Transaction History</span>
        </Link>
      </nav>
    </>
  );
};

export default ProfileSidebar;
