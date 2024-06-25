import "./avatar.scss";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { useNavigate } from "react-router-dom";

const Avatar = ({ imageUrl }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("account");
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <div className="avatar my-1 mx-5">
        {/* <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDarkDropdown"
          aria-controls="navbarNavDarkDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        ></button> */}

        <div className="collapse navbar-collapse" id="navbarNavDarkDropdown">
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <img
                src={imageUrl}
                className="d-fluid rounded-circle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              ></img>

              <ul className="dropdown-menu dropdown-menu-end mt-2">
                <li>
                  <a className="dropdown-item" href="#">
                    <PersonIcon /> Profile
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    <ManageAccountsIcon /> Manage account
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    <SettingsIcon /> Settings
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" onClick={handleLogout}>
                    <LogoutIcon /> Logout
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      {/* <img
        src="imageUrl"
        className="d-fluid rounded-circle"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      ></img> */}
    </>
  );
};

export default Avatar;
