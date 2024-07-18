import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./ViewFinancialProof.scss";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import moment from "moment/moment";
import { getFinancialProof } from "../../../services/apiService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const ViewFinancialProof = () => {
  const id = JSON.parse(localStorage.getItem("account")).memberId;

  const [financialProof, setFinancialProof] = useState(null);
  const [showAvailableAmount, setShowAvailableAmount] = useState(false);
  const [showRequestAmount, setShowRequestAmount] = useState(false);

  useEffect(() => {
    const fetchFinancialProof = async () => {
      try {
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
        You Don't Have Credit Card! Please Add Credit Card in Your Profile.
      </div>
    );
  }

  return (
    <div className="row view-financial-proof">
      <div className="col-md-6">
        <div className="mb-3">
          <div className="card-body">
            <h6 className="card-title">Member Information</h6>
            <p className="card-text text-muted">
              <strong>Full Name:</strong> {financialProof.fullname}
            </p>
            <p className="card-text text-muted">
              <strong>Email:</strong> {financialProof.email}
            </p>
            <p className="card-text text-muted">
              <strong>Card Holder:</strong>{" "}
              {financialProof?.creditCard?.accountHolder || "No"}
            </p>
            <p className="card-text text-muted">
              <strong>Card Number:</strong>{" "}
              {financialProof?.creditCard?.bankNumber || "No"}
            </p>
            <p className="card-text text-muted">
              <strong>Bank Name:</strong>{" "}
              {financialProof?.creditCard?.bankName || "No"}
            </p>
            <p className="card-text text-muted">
              <strong>Address:</strong> {financialProof.address}
            </p>
            <p className="card-text text-muted">
              <strong>Phone:</strong> {financialProof.phone}
            </p>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <div className="mb-3">
          <div className="card-body">
            <h6 className="card-title">Financial Proof Information</h6>
            <p className="card-text">
              <strong>Amount Available: </strong>
              {showAvailableAmount ? (
                <span className="financial-proof-amount">
                  ${financialProof.financialProofAmount}
                </span>
              ) : (
                <span className="financial-proof-amount-hidden">****</span>
              )}
              <Button
                variant="link"
                onClick={() => setShowAvailableAmount(!showAvailableAmount)}
              >
                <FontAwesomeIcon
                  icon={showAvailableAmount ? faEyeSlash : faEye}
                />
              </Button>
              <p className="card-text text-muted">
                Is your financial proof running out? Please create a new request
                for us!
              </p>
              <Link to="/create-financial-proof">
                <Button className="btn-create-new">
                  Create New Financial Proof
                </Button>
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="col-md-12">
        <div className="mb-3">
          <div className="card-body">
            <h6 className="card-title">Financial Proof Request Information</h6>
            <p className="card-text text-muted">
              <strong>Time Request:</strong>{" "}
              {moment(
                financialProof?.financialProofRequest?.timeRequest
              ).format("DD/MM/YYYY HH:mm:ss")}
            </p>
            <p
              className={`card-text ${
                financialProof?.financialProofRequest?.status === "AVAILABLE"
                  ? "text-success"
                  : "text-muted"
              }`}
            >
              <strong className="stt">Status:</strong>{" "}
              {financialProof?.financialProofRequest?.status || "Processing"}
            </p>
            {financialProof?.financialProofRequest?.status === "AVAILABLE" ? (
              <p className="card-text">
                <strong>Financial Proof Amount: </strong>
                {showRequestAmount ? (
                  <span className="financial-proof-amount">
                    $
                    {financialProof.financialProofRequest?.financialProofAmount}
                  </span>
                ) : (
                  <span className="financial-proof-amount-hidden">****</span>
                )}
                <Button
                  variant="link"
                  onClick={() => setShowRequestAmount(!showRequestAmount)}
                >
                  <FontAwesomeIcon
                    icon={showRequestAmount ? faEyeSlash : faEye}
                  />
                </Button>
              </p>
            ) : (
              <p className="card-text text-muted">
                <p className="card-text text-muted">
                  Have you heard about the "Financial Proof" policy?
                </p>
                <Link to="/create-financial-proof">
                  <Button className="btn-create-new">
                    View Policy & Create
                  </Button>
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

ViewFinancialProof.propTypes = {
  id: PropTypes.string.isRequired,
};

export default ViewFinancialProof;
