import Valuation from "@mui/icons-material/Diamond";
import AuctionIcon from "@mui/icons-material/Gavel";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import React from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "./Avatar";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";

const AvatarDropdown = () => {
  const navigate = useNavigate();

  const navigateToValuationRequest = () => {
    navigate("/valuation-request/1");
  };

  const currentUser = JSON.parse(localStorage.getItem("account")) || null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("account");
    navigate("/");
    window.location.reload();
  }

  return (
    <li className="nav-item dropdown">
      <a
        className="nav-link dropdown-toggle mx-5"
        href="#!"
        id="accountDropdown"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <Avatar />
      </a>
      <ul
        className="dropdown-menu border-0 shadow bsb-zoomIn"
        aria-labelledby="accountDropdown"
      >
        {currentUser ? (
          <>
            <li className="src/component/valuation_request/create/CreateValuation.jsx">
              <a className="dropdown-item" href="#!">
                <div className="px-1">
                  Hello {currentUser.username}
                </div>
              </a>
            </li>
            <li className="src/component/valuation_request/create/CreateValuation.jsx">
              <a className="dropdown-item" href="/profile">
                <div className="px-1">
                  <PersonIcon /> Profile
                </div>
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#!">
                <div className="px-1">
                  <AuctionIcon /> My Auction
                </div>
              </a>
            </li>
            <li>
              <a className="dropdown-item" onClick={navigateToValuationRequest}>
                <div className="px-1">
                  <Valuation /> My Valuation
                </div>
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="/checkout">
                <div className="px-1">
                  <SettingsIcon /> My Winner Auction
                </div>
              </a>
            </li>

            <li>
              <a className="dropdown-item" href="#!" onClick={handleLogout}>
                <div className="px-1">
                  <LogoutIcon /> Log Out
                </div>
              </a>
            </li>
          </>
        ) : (
          // khi chưa đăng nhập
          <>
            <li>
              <a className="dropdown-item" href="/login">
                <div className="px-1">
                  <LoginIcon /> Sign In
                </div>
              </a>
            </li>

            <li>
              <a className="dropdown-item" href="/sign-up">
                <div className="px-1">
                  <PersonAddAltIcon /> Sign Up
                </div>
              </a>
            </li>
          </>
        )}
      </ul>
    </li>
  );
};
// Custom toggle to work with hover
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
    onMouseOver={(e) => onClick(e, true)} // Open on hover
    style={{ cursor: "pointer" }}
  >
    {children}
  </a>
));

export default AvatarDropdown;
