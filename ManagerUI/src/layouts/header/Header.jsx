import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import avatar from "../../assets/profile/avatar/staff/avatar_01.png";
import Avatar from "./avatar/Avatar";
import MenuIcon from "@mui/icons-material/Menu";
import "./header.scss";

const Header = ({ onChange }) => {
  const user = {
    name: sessionStorage.getItem("name"),
    role: sessionStorage.getItem("role"),
  };

  return (
    <>
      <nav className="header navbar navbar-expand-lg ">
        <button className="mx-3" onClick={onChange}>
          <MenuIcon className="icon" />
        </button>
        <div className="user-info">
          <p className="header-title my-0 py-0 user-name">
            Welcome <strong>{user.name}</strong>
          </p>
          <Avatar imageUrl={avatar} />
        </div>
      </nav>
    </>
  );
};

export default Header;
