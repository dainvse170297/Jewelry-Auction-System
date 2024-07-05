import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import "./ViewFinancialProof.scss";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import moment from "moment/moment";
import { getFinancialProof } from "../../../services/apiService";

const ViewFinancialProof = ({ id }) => {
  const [financialProof, setFinancialProof] = useState(null);

  useEffect(() => {
    const fetchFinancialProof = async () => {
      try {
        // const response = await axios.get(
        //   `http://localhost:8080/member/financial-proof/${id}`
        // );

        const response = await getFinancialProof(id);
        setFinancialProof(response);
      } catch (error) {
        console.error("Error fetching financial proof data:", error);
      }
    };

    fetchFinancialProof();
  }, [id]);

  if (!financialProof) {
    return (
      <div>
        You Don't Have Credit Card ! Please Add Credit Card in Your Profile
      </div>
    );
  }

  return (
    <div className="row view-financial-proof">
      <div className="col-md-6">
        <div className="mb-3">
          <div className="">
            <h6 className="card-title">Credit Card</h6>
            <p className="card-text text-muted">
              <strong>Card Number:</strong>{" "}
              {financialProof.creditCard.bankNumber}
            </p>
            <p className="card-text text-muted">
              <strong>Card Holder:</strong>{" "}
              {financialProof.creditCard.accountHolder}
            </p>
            <p className="card-text text-muted">
              <strong>Bank Name:</strong> {financialProof.creditCard.bankName}
            </p>
            <p className="card-text text-muted">
              <strong>Expiration Date:</strong> khong co field
              {/* You may need to get this from the API if available */}
            </p>
            <p className="card-text text-muted">
              <strong>CVV:</strong> khong co field
              {/* You may need to get this from the API if available */}
            </p>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <div className=" mb-3">
          <div className="">
            <h6 className="card-title">Member Information</h6>
            <p className="card-text text-muted">
              <strong>Full Name:</strong> {financialProof.fullname}
            </p>
            <p className="card-text text-muted">
              <strong>Email:</strong> {financialProof.email}
            </p>
            <p className="card-text text-muted">
              <strong>Address:</strong> {financialProof.address}
            </p>
            <p className="card-text text-muted">
              <strong>Phone:</strong> {financialProof.phone}
            </p>
            <p className="card-text text-muted">
              <strong>Financial Proof Amount: </strong> $
              {financialProof.financialProofAmount}
            </p>
          </div>
        </div>
      </div>

      <div className="col-md-12">
        <div className=" mb-3">
          <div className="">
            <h6 className="card-title">Financial Proof Request Information</h6>
            <p className="card-text text-muted">
              <strong>Time Request:</strong>{" "}
              {moment(financialProof.financialProofRequest.timeRequest).format(
                "DD/MM/YYYY HH:mm:ss"
              )}
            </p>
            <p className="card-text text-muted">
              <strong>Status:</strong>{" "}
              {financialProof.financialProofRequest.status}
            </p>
            {financialProof.financialProofRequest.status === "AVAILABLE" ? (
              <p className="card-text text-muted">
                <strong>Financial Proof Amount: </strong> $
                {financialProof.financialProofRequest.financialProofAmount}
              </p>
            ) : (
              <p className="card-text text-muted">
                Your request is being processed! Please wait or click "Create
                New" for a new request.
              </p>
            )}
            <Link to="/create-financial-proof">
              <Button className="btn-create-new">Create New</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewFinancialProof;
