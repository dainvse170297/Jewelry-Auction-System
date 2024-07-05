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

const Header = () => {
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
  };

  return (
    <div>
      <Navbar bg="white" expand="lg" className="border-bottom" fixed="top">
        <Container>
          <Navbar.Brand href="/home">
            <House size={24} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto ms-auto">
              <Dropdown>
                <Dropdown.Toggle as={Nav.Link} id="dropdown-auction">
                  AUCTION
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="/live">Live Auctions</Dropdown.Item>
                  <Dropdown.Item href="/upcoming">
                    Upcoming Auctions
                  </Dropdown.Item>
                  <Dropdown.Item href="/past">Past Auctions</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown>
                <Dropdown.Toggle as={Nav.Link} id="dropdown-selling">
                  SELLING
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>
                    <Link to="/selling">About Selling</Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link to="/create-valuation">Create Valuation Request</Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link to="/create-financial-proof">
                      Create Financial Proof
                    </Link>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
            <Nav className="mx-auto">
              <Navbar.Brand href="/home">FU-AUCTION</Navbar.Brand>
            </Nav>
            <Nav className="ms-auto me-auto">
              <Nav.Link href="#contact">CONTACT</Nav.Link>
              <Nav.Link href="#policies">POLICIES</Nav.Link>
              <Nav.Link href="#notifications" className="">
                <Bell size={24} />
              </Nav.Link>
              <Dropdown>
                <Dropdown.Toggle as={Nav.Link} id="dropdown-profile">
                  <Person size={24} />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {currentUser ? (
                    <>
                      <Dropdown.Item href="/profile">
                        {" "}
                        <PersonIcon /> Profile
                      </Dropdown.Item>
                      <Dropdown.Item href="#">
                        {" "}
                        <AuctionIcon /> My Auction
                      </Dropdown.Item>
                      <Dropdown.Item href="#">
                        {" "}
                        <Valuation /> My Valuation
                      </Dropdown.Item>
                      <Dropdown.Item href="/checkout">
                        {" "}
                        <ShoppingCartIcon /> My Winner Auction
                      </Dropdown.Item>
                      <Dropdown.Item href="" onClick={handleLogout}>
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
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
