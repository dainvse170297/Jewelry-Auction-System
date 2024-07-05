import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import avatar from "../../assets/profile/avatar/staff/avatar_01.png";
import Avatar from "./avatar/Avatar";
import MenuIcon from "@mui/icons-material/Menu";
import "./header.scss";

const Header = ({ onChange }) => {
  return (
    <>
      <nav className="header navbar navbar-expand-lg ">
        <button className="mx-3" onClick={onChange}>
          <MenuIcon className="icon" />
        </button>
        <div>
          <Avatar imageUrl={avatar} />
        </div>
      </nav>
    </>
  );
};

export default Header;
