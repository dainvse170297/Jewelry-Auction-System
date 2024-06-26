import { FolderShared, ManageAccounts } from "@mui/icons-material";
import ProfileIcon from "@mui/icons-material/AccountCircle";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ProductIcon from "@mui/icons-material/Diamond";
import ValuationRequestIcon from "@mui/icons-material/DocumentScanner";
import AuctionIcon from "@mui/icons-material/Gavel";
import LightModeIcon from "@mui/icons-material/LightMode";
import UserIcon from "@mui/icons-material/ManageAccounts";
import NightModeIcon from "@mui/icons-material/NightsStay";
import SettingsIcon from "@mui/icons-material/Settings";
import { Link } from "react-router-dom";
import "./sidebar.scss";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";

import logo from "../../assets/logos/logo.jpg";

const staffNavigation = [
  {
    name: "Valuation Request",
    icon: ValuationRequestIcon,
    href: "/valuation-request",
  },
  { name: "Auction", icon: AuctionIcon, href: "/auction" },
  { name: "Product", icon: ProductIcon, href: "/product" },
  { name: "User", icon: UserIcon, href: "/user" },
  { name: "Setting", icon: SettingsIcon, href: "/setting" },
  { name: "Profile", icon: ProfileIcon, href: "/profile" },
];

const managerNavigation = [
  { name: "Dashboard", icon: DashboardIcon, href: "/home" },
  { name: "Valuation Request", icon: ValuationRequestIcon, href: "/valuation" },
  { name: "Auction", icon: AuctionIcon, href: "/auction" },
  { name: "Product", icon: ProductIcon, href: "/product" },
  { name: "User", icon: UserIcon, href: "/user" },
  { name: "Setting", icon: SettingsIcon, href: "/setting" },
  { name: "Profile", icon: ProfileIcon, href: "/profile" },
  { name: "Staff", icon: FolderShared, href: "/staff" },
  { name: "Manager", icon: ManageAccounts, href: "/manager" },
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
              <>
                <li key={index}>
                  <Link to={item.href} className="non-deco">
                    <item.icon className="icon" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              </>
            ))}
        </ul>
      </div>
      <hr />
    </div>
  );
};

export default Sidebar;
