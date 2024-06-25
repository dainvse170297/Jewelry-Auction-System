import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import avatar from "../../assets/profile/avatar/staff/avatar_01.jpg";
import Avatar from "./avatar/Avatar";
const Header = () => {
  return (
    <>
      <nav
        className="navbar navbar-expand-lg d-flex justify-content-end"
        style={{ backgroundColor: "rgb(30, 136, 229)" }}
      >
        <div>
          <Avatar imageUrl={avatar} />
        </div>
      </nav>
    </>
  );
};

export default Header;
