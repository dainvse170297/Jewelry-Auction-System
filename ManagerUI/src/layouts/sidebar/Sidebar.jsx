import React from "react";
import { Link } from "react-router-dom";
import "./sidebar.scss";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../assets/logos/logo.png";

// Icons
import ProfileIcon from "@mui/icons-material/AccountCircle";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ValuationRequestIcon from "@mui/icons-material/DocumentScanner";
import AuctionIcon from "@mui/icons-material/Gavel";
import UserIcon from "@mui/icons-material/ManageAccounts";
import SettingsIcon from "@mui/icons-material/Settings";
import FinancialProofRequestIcon from "@mui/icons-material/RequestQuote";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { MonetizationOn } from "@mui/icons-material";
import { Nav } from "react-bootstrap";

// Navigation
const staffNavigation = [
  {
    name: "Auction",
    icon: AuctionIcon,
    children: [
      { name: "Auction", href: "/auction" },
      { name: "Waiting To Deliver", href: "/auction/purchased-lot" },
      {
        name: "View Delivered Lot",
        href: "/auction/delivered-lot",
      },
    ],
  },
  {
    name: "Valuation Request",
    icon: ValuationRequestIcon,
    children: [
      { name: "All Request", href: "/valuation-request" },

      {
        name: "Set Up Product",
        href: "/valuation-request/received",
      },
    ],
  },
  {
    name: "Financial Request",
    icon: FinancialProofRequestIcon,
    href: "/financial-request",
  },
  {
    name: "Product",
    icon: SettingsIcon,
    children: [{ name: "Pending to send", href: "/product/pending-send" }],
  },
  { name: "Profile", icon: ProfileIcon, href: "/profile" },
];

const managerNavigation = [
  { name: "Dashboard", icon: DashboardIcon, href: "/dashboard" },
  {
    name: "Valuation Request",
    icon: ValuationRequestIcon,
    children: [
      { name: "All request", href: "/valuation-request" },
      {
        name: "Set up product",
        href: "/valuation-request/received",
      },
      { name: "Pending approval", href: "/valuation-request/pending-approval" },
    ],
  },
  {
    name: "Auction",
    icon: AuctionIcon,
    children: [
      {
        name: "Auction sessions",
        href: "/auction",
      },
      {
        name: "Create auction",
        href: "/auction/create",
      },
      {
        name: "Ready lots",
        href: "/auction/ready-lots",
      },
      {
        name: "Public to UPCOMING Auctions",
        href: "/sessions/created",
      },

      { name: "Waiting To Deliver", href: "/auction/purchased-lot" },
      {
        name: "View Delivered Lot",
        href: "/auction/delivered-lot",
      },
    ],
  },
  {
    name: "Financial Request",
    icon: FinancialProofRequestIcon,
    href: "/financial-request",
  },
  {
    name: "Paid List",
    icon: MonetizationOn,
    href: "/paid-list"
  },
  { name: "Staff", icon: UserIcon, href: "/staff-manage" },
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
    <div
      className="d-flex flex-column vh-100 bg-light sidebar"
    // style={{ width: "250px", position: "fixed" }}
    >
      <div className="text-center my-2 mx-0">
        <img
          src={logo}
          alt="Jewelry Auction Logo"
          className="img-fluid rounded-2"
          style={{ maxWidth: "80%" }}
        />
      </div>

      <Nav className="flex-column" style={{ marginLeft: "1rem" }}>
        {currentNavigation &&
          currentNavigation.map((item, index) => (
            <React.Fragment key={index}>
              {item.children ? (
                <>
                  <Nav
                    key={index}
                    className="main-item d-flex justify-content-between"
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
                  </Nav>
                  <div>
                    <ul className="p-0 m-0">
                      {activeKey === index &&
                        item.children.map((child, childIndex) => (
                          <li key={childIndex}>
                            <Link
                              className="child-item"
                              to={child.href}
                              key={childIndex}
                            >
                              <span>{child.name}</span>
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </div>
                </>
              ) : (
                <Link className="main-item" to={item.href} key={index}>
                  <item.icon className="icon" />
                  <span>{item.name}</span>
                </Link>
              )}
            </React.Fragment>
          ))}
      </Nav>
    </div>
  );
};

export default Sidebar;
