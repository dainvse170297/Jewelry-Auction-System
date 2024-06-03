import "./sidebar.scss";
import DashboardIcon from '@mui/icons-material/Dashboard';
import ValuationRequestIcon from '@mui/icons-material/DocumentScanner';
import AuctionIcon from '@mui/icons-material/Gavel';
import ProductIcon from '@mui/icons-material/Diamond';
import UserIcon from '@mui/icons-material/ManageAccounts';
import ProfileIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import NightModeIcon from '@mui/icons-material/NightsStay';
import LightModeIcon from '@mui/icons-material/LightMode';

const Sidebar = () => {

    return (
        <div className="sidebar">
            {/* Top of side bar */}
            <div className="top">
                <span className="logo">Team 6 Vjp</span>
            </div>
            <hr />

            {/* Center of side bar */}
            <div className="center">
                <ul >
                    {/* Main */}
                    <p className="title">MAIN</p>
                    <li>
                        <DashboardIcon className="icon"/>
                        <span>Dashboard</span>
                    </li>

                    {/* Menu list/Feature */}
                    <p className="title">MENU</p>
                    <li>
                        <ValuationRequestIcon className="icon"/>
                        <span>Valuation Request</span>
                    </li>
                    <li>
                        <AuctionIcon className="icon"/>
                        <span>Auction</span>
                    </li>
                    <li>
                        <ProductIcon className="icon"/>
                        <span>Product</span>
                    </li>
                    <li>
                        <UserIcon className="icon"/>
                        <span>User</span>
                    </li>

                    {/* User service*/}
                    <p className="title">SERVICE</p>
                    <li>
                        <SettingsIcon className="icon"/>
                        <span>Setting</span>
                    </li>
                    <li>
                        <ProfileIcon className="icon"/>
                        <span>Profile</span>
                    </li>
                </ul>
            </div>
            <hr />
            
            {/* Bottom of side bar */}
            <div className="bottom">
                <ul>
                    <li>
                        <div className="colorOption">
                            <LightModeIcon />
                        </div>
                        <div className="colorOption">
                            <NightModeIcon className="night"/>
                        </div>
                    </li>
                    <li>
                        <img src="src\assets\logos\main_logo.jpg" className="image"></img>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;