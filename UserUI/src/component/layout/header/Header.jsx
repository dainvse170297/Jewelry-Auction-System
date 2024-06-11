import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import "./header.scss";
import AvatarDropdown from "../avatar/AvatarDropdown";

class Header extends React.Component {
    render() {
        return (
            <div className="header">
                <nav className="navbar navbar-expand-md bsb-navbar bsb-navbar-hover bsb-navbar-caret p-0">
                    <a className="navbar-brand" href="index.html">
                        {/* <img src="./assets/img/bsb-logo.svg" alt="BootstrapBrain Logo" width="135" height="44"> */}
                    </a>
                    <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        {/* <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div> */}
                        <div className="offcanvas-body">
                            <ul className="navbar-nav justify-content-center align-items-center flex-grow-1">

                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle mx-5" href="#!" id="accountDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Auction</a>
                                    <ul className="dropdown-menu border-0 shadow bsb-zoomIn" aria-labelledby="accountDropdown">
                                        <li><a className="dropdown-item" href="#!">Live auction</a></li>
                                        <li><a className="dropdown-item" href="#!">Upcoming auction</a></li>
                                        <li><a className="dropdown-item" href="#!">Past auction</a></li>
                                    </ul>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle mx-5" href="#!" id="servicesDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Selling</a>
                                    <ul className="dropdown-menu border-0 shadow bsb-zoomIn" aria-labelledby="servicesDropdown">
                                        <li><a className="dropdown-item" href="/selling">About Selling</a></li>
                                        <li><a className="dropdown-item" href="/create-valuation">Send Valuation Request</a></li>
                                    </ul>
                                </li>
                                <li className="nav-item p logo">
                                    <a className="nav-link mx-5" aria-current="page" href="/home">SWP</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link mx-5" href="#!">About</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link mx-5" href="#!">Contact</a>
                                </li>

                                <AvatarDropdown />
                            </ul>
                        </div>
                    </div>
                </nav>
                <hr />
            </div>
        )
    }
}

export default Header;