import React from "react";
import ProfileIcon from "@mui/icons-material/AccountCircle";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ValuationRequestIcon from "@mui/icons-material/DocumentScanner";
import AuctionIcon from "@mui/icons-material/Gavel";
import UserIcon from "@mui/icons-material/ManageAccounts";
import SettingsIcon from "@mui/icons-material/Settings";
import FinancialProofRequestIcon from "@mui/icons-material/RequestQuote";
import { Link } from "react-router-dom";
import "./sidebar.scss";
import { useEffect, useState } from "react";

import logo from "../../assets/logos/logo.jpg";

const staffNavigation = [
  {
    name: "Valuation Request",
    icon: ValuationRequestIcon,
    href: "/valuation-request",
  },
  {
    name: "Financial Proof Request",
    icon: FinancialProofRequestIcon,
    href: "/financial-request",
  },
  { name: "Auction", icon: AuctionIcon, href: "/auction" },
  // { name: "Setting", icon: SettingsIcon, href: "/setting" },
  { name: "Profile", icon: ProfileIcon, href: "/profile" },
];

const managerNavigation = [
  { name: "Dashboard", icon: DashboardIcon, href: "/dashboard" },
  {
    name: "Valuation Request",
    icon: ValuationRequestIcon,
    href: "/valuation-request",
  },
  { name: "Auction", icon: AuctionIcon, href: "/auction" },
  { name: "User", icon: UserIcon, href: "/user-manage" },
  { name: "Setting", icon: SettingsIcon, href: "/setting" },
  { name: "Profile", icon: ProfileIcon, href: "/profile" },
];

const Sidebar = () => {
  const user = {
    name: sessionStorage.getItem("name"),
    role: sessionStorage.getItem("role"),
  };
  const [currentNavigation, setCurrentNavigation] = useState();

  useEffect(() => {
    if (user.role === "STAFF") {
      setCurrentNavigation(staffNavigation);
    } else if (user.role === "MANAGER") {
      setCurrentNavigation(managerNavigation);
    }
  }, [user]);

  return (
    <div className="sidebar">
      {/* Top of side bar */}
      <div className="row d-flex justify-content-center">
        <img className="logo-circle" src={logo} alt="" />
      </div>
      <div className="row">
        <div className="top">
          <Link
            to={"/home"}
            className="non-deco"
            style={{ textDecoration: "none" }}
          >
            <span className="logo">Office Employee</span>
          </Link>
        </div>
      </div>

      <hr />

      {/* Center of side bar */}
      <div className="center">
        <ul>
          {currentNavigation &&
            currentNavigation.map((item, index) => (
              <React.Fragment key={index}>
                {" "}
                {/* Add a unique key prop here */}
                <li>
                  <Link to={item.href} className="non-deco">
                    <item.icon className="icon" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              </React.Fragment>
            ))}
        </ul>
      </div>
      <hr />
    </div>
  );
};

export default Sidebar;
