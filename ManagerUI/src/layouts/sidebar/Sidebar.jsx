import React from "react";
import { Link } from "react-router-dom";
import "./sidebar.scss";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../assets/logos/logo.jpg";

// Icons
import ProfileIcon from "@mui/icons-material/AccountCircle";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ValuationRequestIcon from "@mui/icons-material/DocumentScanner";
import AuctionIcon from "@mui/icons-material/Gavel";
import UserIcon from "@mui/icons-material/ManageAccounts";
import SettingsIcon from "@mui/icons-material/Settings";
import FinancialProofRequestIcon from "@mui/icons-material/RequestQuote";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// Navigation
const staffNavigation = [
  { name: "Auction", icon: AuctionIcon, href: "/auction" },

  {
    name: "Valuation Request",
    icon: ValuationRequestIcon,
    children: [
      { name: "All request", href: "/valuation-request" },
      { name: "Set up product", href: "/valuation-request/received" },
    ],
  },
  {
    name: "Financial Request",
    icon: FinancialProofRequestIcon,
    href: "/financial-request",
  },
  // { name: "Setting", icon: SettingsIcon, href: "/setting" },
  { name: "Profile", icon: ProfileIcon, href: "/profile" },
];

const managerNavigation = [
  { name: "Dashboard", icon: DashboardIcon, href: "/dashboard" },
  {
    name: "Valuation Request",
    icon: ValuationRequestIcon,
    children: [
      { name: "All request", href: "/valuation-request" },
      { name: "Pending approval", href: "/valuation-request/pending-approval" },
    ],
  },
  {
    name: "Auction",
    icon: AuctionIcon,
    children: [
      { name: "Auction sessions", href: "/auction" },
      { name: "Create auction", href: "/auction/create" },
      {
        name: "Ready lots",
        href: "/auction/ready-lots",
      },
    ],
  },
  {
    name: "Financial Request",
    icon: FinancialProofRequestIcon,
    href: "/financial-request",
  },
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
  const [activeKey, setActiveKey] = useState(null);

  const handleToggle = (key) => {
    setActiveKey(activeKey === key ? null : key);
  };

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
      <div className="row"></div>
      <div className="center">
        <ul>
          {currentNavigation &&
            currentNavigation.map((item, index) => (
              <>
                {(item.children && (
                  <>
                    <li
                      className="d-flex justify-content-between pl-4"
                      onClick={() => handleToggle(index)}
                    >
                      <div>
                        <item.icon className="icon" />
                        <span>{item.name}</span>
                      </div>
                      <div className="down-icon">
                        <ExpandMoreIcon
                          style={{
                            transform:
                              activeKey === index
                                ? "rotate(180deg)"
                                : "rotate(0deg)",
                            transition: "transform 0.3s ease",
                          }}
                        />
                      </div>
                    </li>
                    {/* <div className="child-side"></div> */}
                    <ul>
                      {activeKey && activeKey === index && (
                        <div
                          className={`dropdown ${activeKey === index ? "dropdown-visible" : ""
                            }`}
                        >
                          {item.children.map((child, index) => (
                            <li key={index}>
                              <Link to={child.href} className="non-deco">
                                <span>{child.name}</span>
                              </Link>
                            </li>
                          ))}
                        </div>
                      )}
                    </ul>
                  </>
                )) || (
                    <li>
                      <Link to={item.href} className="non-deco">
                        <item.icon className="icon" />
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  )}
              </>
            ))}
        </ul>
      </div>
      <hr />
    </div>
  );
};

export default Sidebar;
