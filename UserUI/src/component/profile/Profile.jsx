import React, { useEffect } from "react";
import "./profile.scss";
import ProfileDetail from "./ProfileDetail/ProfileDetail";
import { useNavigate } from "react-router-dom";
import ChangePassword from "./ChangePassword/ChangePassword";
import MyValuationRequest from "./valuation-request/MyValuationRequest";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CheckOut from "../checkout/CheckOut";
import ViewFinancialProof from "./FinancialProof/ViewFinancialProof";

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
    <div className="container">
      <div className="row gutters-sm">
        <div className="col-md-4 d-none d-md-block">
          <div className="">
            <div className="">
              <nav className="nav flex-column nav-pills nav-gap-y-1">
                <a
                  href="#profile"
                  data-toggle="tab"
                  className="nav-item nav-link has-icon nav-link-faded active"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-user mr-2 me-3"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx={12} cy={7} r={4} />
                  </svg>
                  Profile Information
                </a>
                <a
                  href="#security"
                  data-toggle="tab"
                  className="nav-item nav-link has-icon nav-link-faded"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-shield mr-2 me-3"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  Change Password
                </a>
                <a
                  href="#notification"
                  data-toggle="tab"
                  className="nav-item nav-link has-icon nav-link-faded"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="main-grid-item-icon me-3"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  >
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                  </svg>
                  Notification
                </a>
                <a
                  href="#billing"
                  data-toggle="tab"
                  className="nav-item nav-link has-icon nav-link-faded"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-credit-card mr-2 me-3"
                  >
                    <rect x={1} y={4} width={22} height={16} rx={2} ry={2} />
                    <line x1={1} y1={10} x2={23} y2={10} />
                  </svg>
                  Financial Proof
                </a>
                <a
                  href="#valuationRequest"
                  data-toggle="tab"
                  className="nav-item nav-link has-icon nav-link-faded"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="main-grid-item-icon me-3"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  >
                    <line x1="22" x2="11" y1="2" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                  My Valuation Request
                </a>
              </nav>
            </div>
          </div>
        </div>

        <div className="col-md-8">
          <div className="">
            <div className=" border-bottom mb-3 d-flex d-md-none">
              <ul
                className="nav nav-tabs card-header-tabs nav-gap-x-1"
                role="tablist"
              >
                <li className="nav-item">
                  <a
                    href="#profile"
                    data-toggle="tab"
                    className="nav-link has-icon active"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-user"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx={12} cy={7} r={4} />
                    </svg>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="#security"
                    data-toggle="tab"
                    className="nav-link has-icon"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-shield"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="#notification"
                    data-toggle="tab"
                    className="nav-link has-icon"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      className="main-grid-item-icon"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    >
                      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                    </svg>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="#billing"
                    data-toggle="tab"
                    className="nav-link has-icon"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-credit-card"
                    >
                      <rect x={1} y={4} width={22} height={16} rx={2} ry={2} />
                      <line x1={1} y1={10} x2={23} y2={10} />
                    </svg>
                  </a>
                </li>

                <li className="nav-item">
                  <a
                    href="#valuationRequest"
                    data-toggle="tab"
                    className="nav-link has-icon"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      className="main-grid-item-icon me-3"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    >
                      <line x1="22" x2="11" y1="2" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
            <div className="tab-content">
              <div className="tab-pane active" id="profile">
                <ProfileDetail memberId={currentUser.memberId} />
              </div>
              <div className="tab-pane" id="winnerAuction">
                <CheckOut />
              </div>
              <div className="tab-pane" id="security">
                <ChangePassword />
              </div>
              <div className="tab-pane" id="notification">
                <h6>NOTIFICATION HERE</h6>
                <hr />

              </div>

              <div className="tab-pane" id="billing">
                <h6>FINANCIAL PROOF</h6>
                <hr />
                <ViewFinancialProof id={currentUser.memberId} />
              </div>

              <div className="tab-pane" id="valuationRequest">
                <MyValuationRequest id={currentUser.memberId} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
