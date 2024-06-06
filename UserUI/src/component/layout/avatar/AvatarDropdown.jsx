import React from 'react';
import { Dropdown, Image } from 'react-bootstrap';
import Avatar from './Avatar';
import PersonIcon from '@mui/icons-material/Person';
import AuctionIcon from '@mui/icons-material/Gavel';
import Valuation from '@mui/icons-material/Diamond';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

const AvatarDropdown = () =>{
    return (
      <li className="nav-item dropdown">
            <div id="accountDropdown">
              <Avatar />
            </div>         
            <ul className="dropdown-menu border-0 shadow bsb-zoomIn" aria-labelledby="accountDropdown">
                <li className='src/component/valuation_request/create/CreateValuation.jsx'>
                  <a className="dropdown-item" href="#!">
                    <div className="px-1">
                      <PersonIcon/> Profile
                    </div>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#!">
                    <div className="px-1">
                      <AuctionIcon/> My Auction
                    </div>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#!">
                    <div className="px-1">
                      <Valuation/> My Valuation
                    </div>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#!">
                    <div className="px-1">
                      <SettingsIcon/> Settings
                    </div>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#!">
                    <div className="px-1">
                     <LogoutIcon/> Logout
                    </div>
                  </a>
                </li>
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