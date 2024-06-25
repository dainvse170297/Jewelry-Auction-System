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

const Sidebar = () => {
  return (
    <div className="sidebar">
      {/* Top of side bar */}
      <div className="top">
        <Link
          to={"/home"}
          className="non-deco"
          style={{ textDecoration: "none" }}
        >
          <span className="logo">Office Employee</span>
        </Link>
      </div>
      <hr />

      {/* Center of side bar */}
      <div className="center">
        <ul>
          {/* Main */}
          <p className="title">MAIN</p>
          <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>

          {/* Menu list/Feature */}
          <p className="title">MENU</p>
          <li>
            <ValuationRequestIcon className="icon" />
            <span>Valuation Request</span>
          </li>
          <li>
            <AuctionIcon className="icon" />
            <span>Auction</span>
          </li>
          <li>
            <ProductIcon className="icon" />
            <span>Product</span>
          </li>
          <li>
            <UserIcon className="icon" />
            <span>User</span>
          </li>

          {/* User service*/}
          <p className="title">SERVICE</p>
          <li>
            <SettingsIcon className="icon" />
            <span>Setting</span>
          </li>
          <li>
            <ProfileIcon className="icon" />
            <span>Profile</span>
          </li>
          <li>
            <Link to={"/staff-function"} className="non-deco">
              <FolderShared className="icon" />
              <span>Staff</span>
            </Link>
          </li>
          <li>
            <Link to={"/Manager"} className="non-deco">
              <ManageAccounts className="icon" />
              <span>Manager</span>
            </Link>
          </li>
        </ul>
      </div>
      <hr />
    </div>
  );
};

export default Sidebar;
