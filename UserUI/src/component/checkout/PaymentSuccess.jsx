import React, { useEffect, useState } from "react";
import logo from "../../assets/logo/logo.png";
import "./checkout.scss";
import { CircularProgress, Link } from "@mui/material";
import { Box } from "react-bootstrap-icons";
import { getProfileDetail } from "../../services/apiService";

const PaymemtSuccess = () => {

  const memberId = JSON.parse(localStorage.getItem("account")).memberId;
  const [member, setMember] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchMember = async () => {
      try {
        const response = await getProfileDetail(memberId);
        setMember(response);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMember();
  }, []);

  return (
    <center>
      <div className="container mt-5">

        <div className="row">
          <div className="col-lg-3"></div>
          <div className="fr col-lg-6">
            {isLoading ? (
              <CircularProgress />
            ) : (
              <>
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
                <h6>
                  <Box size={20} className="me-2" /> Delivery Address
                </h6>
                <h6>
                  {member.address}
                </h6 >
                <div className="d-flex justify-content-center">
                  <Link href="/home" underline="hover" className="me-5">
                    Home
                  </Link>
                  <Link href="/CheckOut" underline="hover">
                    Continue
                  </Link>
                </div>
              </>
            )}
          </div>
          <div className="col-lg-3"></div>
        </div>

      </div>
    </center>
  );
};

export default PaymemtSuccess;
