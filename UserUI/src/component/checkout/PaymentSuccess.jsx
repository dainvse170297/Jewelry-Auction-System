import React from "react";
import logo from "../../assets/logo/logo.png";
import "./checkout.scss";

const PaymemtSuccess = () => {
  setTimeout(() => {
    window.location.href = "/home";
  }, 2000);

  return (
    <center>
      <div className="container mt-5">
        <div className="row">
          <div className="col-lg-3"></div>
          <div className="fr col-lg-6">
            <div className="svg-container mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="200"
                height="200"
                className="main-grid-item-icon"
                color="#68E534"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>

            <h2>Payment Successful</h2>
            <p>Thank you for your payment. Your order is being processed.</p>
            <div className="">
              <img src={logo} alt="logo" width={"200px"} />
            </div>
          </div>
          <div className="col-lg-3"></div>
        </div>
      </div>
    </center>
  );
};

export default PaymemtSuccess;
