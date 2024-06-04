import React from 'react';
import { Dropdown, Image } from 'react-bootstrap';

const AvatarDropdown = () =>{
    return (
      <li className="nav-item dropdown">
          <ul className="dropdown-menu border-0 shadow bsb-zoomIn" aria-labelledby="accountDropdown">
              <li><a className="dropdown-item" href="#!">Live auction</a></li>
              <li><a className="dropdown-item" href="#!">Upcoming auction</a></li>
              <li><a className="dropdown-item" href="#!">Past auction</a></li>
          </ul>
      </li>
    );
}

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
    style={{ cursor: 'pointer' }}
  >
    {children}
  </a>
));

export default AvatarDropdown;