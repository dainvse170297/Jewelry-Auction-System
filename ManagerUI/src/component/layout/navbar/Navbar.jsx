import "./navbar.scss";
import SearchIcon from '@mui/icons-material/Search';
import LanguageIcon from '@mui/icons-material/Language';
import NightModeIcon from '@mui/icons-material/NightsStay';
import NotificationsIcon from '@mui/icons-material/CircleNotifications';

import Avatar from "../avatar/Avatar";
const Navbar = () => {

    return (
        <div className="navbar">
            <div className="wrapper">
                <div className="search">
                    {/* <input type="text" placeholder="Search..." />
                    <SearchIcon /> */}
                </div>
                <div className="items">
                    <div className="item">
                        {/* <LanguageIcon className="icon"/>
                        <span>English</span> */}
                    </div>
                    <div className="item">
                        {/* <NightModeIcon className="icon"/> */}
                    </div>
                    <div className="item">
                        {/* <NotificationsIcon className="icon"/> */}
                    </div>
                    <Avatar />
                </div>
            </div>
        </div>
    );
}

export default Navbar;