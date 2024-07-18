import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import { Container, Dropdown, Nav, Navbar } from "react-bootstrap";
import { Bell, House, Person } from "react-bootstrap-icons";
import "./header.scss";
import { Link, useNavigate } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import Valuation from "@mui/icons-material/Diamond";
import AuctionIcon from "@mui/icons-material/Gavel";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import logo from "../../../assets/logo/logo.png";

const Header = () => {
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem("account")) || null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("account");
    navigate("/");
    window.location.reload();
  };

  return (
    <Navbar
      bg="white"
      expand="lg"
      className="border-bottom  d-flex justify-content-center "
      fixed="top"
    >
      <Container className="mx-4">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="row">
          <div className="col-5 d-flex justify-content-center align-item-center">
            <Nav className="me-auto ms-auto">
              <Navbar.Brand href="/home">
                <House size={24} />
              </Navbar.Brand>
              <Dropdown>
                <Dropdown.Toggle
                  as={Nav.Link}
                  id="dropdown-auction"
                  className="mx-4"
                >
                  AUCTION
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/upcoming">
                    Upcoming Auctions
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/live">
                    Live Auctions
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/past">
                    Past Auctions
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown>
                <Dropdown.Toggle
                  as={Nav.Link}
                  id="dropdown-selling"
                  className="mx-4"
                >
                  SELLING
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/selling">
                    About Selling
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/create-valuation">
                    Send Valuation Request
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/create-financial-proof">
                    Create My Financial Proof
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>{" "}
          </div>

          <div className="col-2 d-flex justify-content-center align-item-center">
            <Nav className="mx-auto">
              <Navbar.Brand as={Link} to="/home" className="p-0 m-0">
                <img src={logo} alt="logo" width="70" />
              </Navbar.Brand>
            </Nav>
          </div>

          <div className="col-5  d-flex justify-content-center align-item-center">
            <Nav className="ms-auto me-auto px-0 mx-0">
              <Nav.Link as={Link} to={"/contact"} className="mx-4">
                CONTACT
              </Nav.Link>
              <Dropdown>
                <Dropdown.Toggle
                  as={Nav.Link}
                  id="dropdown-auction"
                  className="mx-4"
                >
                  POLICIES
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="/privacy-policy">
                    Privacy Policy
                  </Dropdown.Item>
                  <Dropdown.Item href="/terms-conditions">
                    Terms & Conditions
                  </Dropdown.Item>
                  <Dropdown.Item href="/delivery">
                    Delivery instructions
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Nav.Link as={Link} to={"/notify"} className="">
                <Bell size={24} />
              </Nav.Link>
              <Dropdown>
                <Dropdown.Toggle
                  as={Nav.Link}
                  id="dropdown-profile"
                  className="mx-4"
                >
                  <Person size={24} />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {currentUser ? (
                    <>
                      <Dropdown.Item as={Link} to="/profile">
                        {" "}
                        <PersonIcon /> Profile
                      </Dropdown.Item>

                      <Dropdown.Item href="/checkout">
                        {" "}
                        <ShoppingCartIcon /> My Winner Auction
                      </Dropdown.Item>
                      <Dropdown.Item onClick={handleLogout}>
                        {" "}
                        <LogoutIcon /> Log Out
                      </Dropdown.Item>
                    </>
                  ) : (
                    <>
                      <Dropdown.Item href="/login">
                        {" "}
                        <LoginIcon /> Sign In
                      </Dropdown.Item>
                      <Dropdown.Item href="/sign-up">
                        <PersonAddAltIcon /> Sign Up
                      </Dropdown.Item>
                    </>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
