import { Container } from "react-bootstrap";
import { Outlet, useNavigate } from "react-router-dom";
import ProfileSidebar from "./sidebar/ProfileSidebar";
import { useEffect } from "react";
import "./profile.scss";
import MiniSidebar from "./sidebar/MiniSidebar";

const Profile = () => {
  const currentUser = JSON.parse(localStorage.getItem("account"));

  const navigate = useNavigate();

  useEffect(() => {
    let memberId = null;
    if (currentUser) {
      memberId = currentUser.memberId;
    } else {
      navigate("/login", { state: { from: `/profile` } });
    }
  }, [currentUser]);

  return (
    <>
      <div className="container">
        <div className="row gutters-sm">
          <div className="col-md-4 d-none d-md-block">
            <ProfileSidebar className style={{ height: "100vh" }} />
          </div>
          <div className="col-md-8">
            <div>
              <MiniSidebar />
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
