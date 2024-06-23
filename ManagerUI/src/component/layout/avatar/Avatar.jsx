import "./avatar.scss";
// import Avatar from './Avatar';
import PersonIcon from '@mui/icons-material/Person';
import AuctionIcon from '@mui/icons-material/Gavel';
import Valuation from '@mui/icons-material/Diamond';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

const Avatar = () => {
    return (
        <div className="avatar">
            <nav className="navbar navbar-expand-md bsb-navbar bsb-navbar-hover bsb-navbar-caret p-0">
                <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                    {/* <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div> */}
                    <div className="offcanvas-body">
                        <div className="navbar-nav justify-content-end flex-grow-1">
                            <div className="nav-item dropdown">
                                <img src="src\assets\logos\main_logo.jpg" className="nav-link dropdown-toggle mx-5" id="accountDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" />
                                <ul className="dropdown-menu border-0 shadow bsb-zoomIn" aria-labelledby="accountDropdown">
                                    <li><a className="dropdown-item" href="#!">Live auction</a></li>
                                    <li><a className="dropdown-item" href="#!">Upcoming auction</a></li>
                                    <li><a className="dropdown-item" href="#!">Past auction</a></li>
                                </ul>
                            </div>
                        </div>


                    </div>

                </div>
            </nav>

        </div>
    );
}

export default Avatar;