import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./header.scss";
import AvatarDropdown from "../avatar/AvatarDropdown";
import HomeIcon from "@mui/icons-material/Home";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <nav className="navbar navbar-expand-md bsb-navbar bsb-navbar-hover bsb-navbar-caret p-0">
          <a className="navbar-brand" href="index.html">
            {/* <img src="./assets/img/bsb-logo.svg" alt="BootstrapBrain Logo" width="135" height="44"> */}
          </a>
          <div
            className="offcanvas offcanvas-end"
            tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-center align-items-center flex-grow-1">
                <li className="nav-item home-icon">
                  <a className="nav-link" href="/home">
                    <HomeIcon />
                  </a>
                </li>

                <li className="nav-item dropdown item">
                  <a
                    className="nav-link dropdown-toggle mx-5"
                    href="#!"
                    id="accountDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    AUCTION
                  </a>
                  <ul
                    className="dropdown-menu border-0 shadow bsb-zoomIn"
                    aria-labelledby="accountDropdown"
                  >
                    <li>
                      <a className="dropdown-item" href="#!">
                        Live auction
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#!">
                        Upcoming auction
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#!">
                        Past auction
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item dropdown item">
                  <a
                    className="nav-link dropdown-toggle mx-5"
                    href="#!"
                    id="servicesDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    SELLING
                  </a>
                  <ul
                    className="dropdown-menu border-0 shadow bsb-zoomIn"
                    aria-labelledby="servicesDropdown"
                  >
                    <li>
                      <a className="dropdown-item" href="/selling">
                        About Selling
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/create-valuation">
                        Send Valuation Request
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item p logo">
                  <a className="nav-link mx-5" aria-current="page" href="/home">
                    SWP
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link mx-5 item" href="#!">
                    POLICIES
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link mx-5 item" href="#!">
                    CONTACT
                  </a>
                </li>

                <li className="nav-item notify-icon">
                  <a className="nav-link" href="/#">
                    <NotificationsNoneIcon />
                  </a>
                </li>

                <li className="nav-item avatar-icon">
                  <AvatarDropdown />
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <hr />
      </div>
    );
  }
}

export default Header;
