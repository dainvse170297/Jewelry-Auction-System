import React, { useState } from "react";
import { Button, Modal, Form, Carousel } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import { postSetAmountFinancialProof } from "../../services/apiService";

import moment from "moment";

const FinancialProofRequestDetail = ({
  valuationRequest,
  onHide,
  staffId,
  userRole,
}) => {
  const [preliminaryValuation, setPreliminaryValuation] = useState({
    id: "",
    financialProofAmount: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPreliminaryValuation({
      ...preliminaryValuation,
      [name]: value,
    });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (value.trim() === "") {
      if (name === "financialProofAmount") {
        toast.error("Financial Proof Amount is required");
      }
    }
  };

  const PreliminaryConfirm = async () => {
    console.log("valuationRequest.id:", valuationRequest.id);
    console.log("userRole", userRole);
    console.log("who id:", staffId);
    console.log("valuationRequest.status:", valuationRequest.status);
    try {
      if (
        userRole === "MANAGER" &&
        valuationRequest.status === "PENDING_MANAGER_APPROVAL"
      ) {
        // Handle approval or rejection for manager
        await confirmVIP(true); // Assuming this function exists for manager actions
      } else {
        // Regular staff or manager action for setting financial proof amount

        const data = await postSetAmountFinancialProof(
          valuationRequest.id,
          staffId,
          preliminaryValuation.financialProofAmount,
          userRole
        );

        if (data.status === "AVAILABLE") {
          toast.success("Financial Proof Successfully Set");
          onHide(true); // Hide modal
          window.location.reload(); // Reload page to remove modal
        } else if (data.status === "PENDING_MANAGER_APPROVAL") {
          toast.success("Financial Proof Sent to Manager for Approval");
          onHide(true); // Hide modal
          window.location.reload(); // Reload page to remove modal
        } else {
          toast.error("Failed to set Financial Proof");
        }
      }
    } catch (error) {
      console.log("Error:", error.message);
      toast.error("Error When Setting Financial Proof");
    }
  };

  const confirmVIP = async (confirmValue) => {
    try {
      const formData = new FormData();
      formData.append("id", valuationRequest.id);
      formData.append("managerId", staffId);
      formData.append("confirm", confirmValue);

      const response = await axios.post(
        `http://localhost:8080/financial-proof/confirm-vip`,
        formData
      );

      if (response.status === 200) {
        if (confirmValue && response.data.status === "AVAILABLE") {
          toast.success("Approve successfully");

          window.location.reload(); // Reload page to remove modal
        } else if (!confirmValue && response.data.status === "REJECTED") {
          toast.success("Reject successfully");

          window.location.reload(); // Reload page to remove modal
        } else {
          toast.error("Failed to confirm VIP");
        }
        onHide(true); // Hide modal
      } else {
        console.log("Failed to confirm VIP");
      }
    } catch (error) {
      console.log("Error:", error.message);
      toast.error("Error when confirming financial proof");
    }
  };

  const canSetAmount = () => {
    if (userRole === "MANAGER") {
      return (
        valuationRequest.status === "REQUESTED" ||
        valuationRequest.status === "PENDING_MANAGER_APPROVAL"
      );
    } else if (userRole === "STAFF") {
      return valuationRequest.status === "REQUESTED";
    }
    return false;
  };

  return (
    <>
      <div className="card card-body">
        <p>
          Member Id: <strong>{valuationRequest.memberId}</strong>
        </p>
        <p>
          Time request:{" "}
          <strong>
            {moment(valuationRequest.timeRequest).format("DD/MM/YYYY HH:mm:ss")}
          </strong>
        </p>
        <p>
          Valuation status: <strong>{valuationRequest.status}</strong>
        </p>
        <p>
          Financial Proof Amount:{" "}
          <strong>{valuationRequest.financialProofAmount}$</strong>
        </p>

        <div className="row mb-3 mx-2 d-flex justify-content-center">
          <div className="col-sm-6">
            {(userRole === "MANAGER" &&
              valuationRequest.status === "PENDING_MANAGER_APPROVAL") ||
            (userRole === "STAFF" &&
              valuationRequest.status === "PENDING_MANAGER_APPROVAL") ||
            valuationRequest.status === "AVAILABLE" ||
            valuationRequest.status === "REJECTED" ||
            valuationRequest.status === "CANCELED" ? null : (
              <Form.Label htmlFor="financialProofAmount">
                Set Amount <span style={{ color: "red" }}>*</span>
              </Form.Label>
            )}
          </div>
          <div className="col-sm-6">
            {(userRole === "MANAGER" &&
              valuationRequest.status === "PENDING_MANAGER_APPROVAL") ||
            (userRole === "STAFF" &&
              valuationRequest.status === "PENDING_MANAGER_APPROVAL") ||
            valuationRequest.status === "AVAILABLE" ||
            valuationRequest.status === "REJECTED" ||
            valuationRequest.status === "CANCELED" ? null : (
              <Form.Control
                type="number"
                id="financialProofAmount"
                name="financialProofAmount"
                value={preliminaryValuation.financialProofAmount}
                onChange={handleInputChange}
                onBlur={handleBlur}
                disabled={!canSetAmount()} // Disable input if user cannot set amount
              />
            )}
          </div>
        </div>
      </div>

      <Carousel className="mt-4">
        {valuationRequest.financialProofImages &&
          valuationRequest.financialProofImages.map((image, index) => (
            <Carousel.Item key={index}>
              <img
                className="d-block w-100"
                src={image}
                alt={`Slide ${index}`}
              />
            </Carousel.Item>
          ))}
      </Carousel>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => onHide(false)}>
          Close
        </Button>
        {userRole === "MANAGER" &&
        valuationRequest.status === "PENDING_MANAGER_APPROVAL" ? (
          <>
            <Button variant="success" onClick={() => PreliminaryConfirm(true)}>
              Approve
            </Button>
            <Button variant="danger" onClick={() => PreliminaryConfirm(false)}>
              Reject
            </Button>
          </>
        ) : (
          canSetAmount() && (
            <Button variant="success" onClick={PreliminaryConfirm}>
              Set Amount
            </Button>
          )
        )}
      </Modal.Footer>
    </>
  );
};

const VIPFinancialProofRequestDetail = ({
  valuationRequest,
  onHide,
  managerId,
}) => {
  const PreliminaryConfirm = async (b) => {
    try {
      const formData = new FormData();

      formData.append("id", valuationRequest.id);
      formData.append("managerId", managerId);
      formData.append("confirm", b);

      const response = await axios.post(
        `http://localhost:8080/financial-proof/confirm-vip`,
        formData
      );

      if (response.status === 200 && response.data.status === "AVAILABLE") {
        console.log("Success");
        toast.success("Approve successfully");
        onHide(true);
      } else if (
        response.status === 200 &&
        response.data.status === "REJECTED"
      ) {
        console.log("Success");
        toast.success("Reject successfully");
        onHide(true);
      } else {
        console.log("Failed");
      }
    } catch (error) {
      console.log("Error:", error.message);
      toast.error("Error when confirming financial proof");
    }
  };

  return (
    <>
      <div className="col card">
        <div className="row">
          <h3 className="text-center">Financial Proof Request Details</h3>
        </div>

        <div className="row px-5">
          {valuationRequest && (
            <>
              <div className="card card-body">
                <p>
                  Member Id: <strong>{valuationRequest.memberId}</strong>
                </p>
                {/* <p>
                  Description: <strong>{valuationRequest.description}</strong>
                </p> */}
                <p>
                  Time request:{" "}
                  <strong>
                    {moment(valuationRequest.timeRequest).format(
                      "DD/MM/YYYY HH:mm:ss"
                    )}
                  </strong>
                </p>
                <p>
                  Status: <strong>{valuationRequest.status}</strong>
                </p>
                <p>
                  Financial Proof Amount:{" "}
                  <strong>{valuationRequest.financialProofAmount}$</strong>
                </p>
                <div className="col">
                  <div className="row-sm-9 d-flex justify-content-center">
                    <Button
                      className="btn-success mx-3"
                      onClick={() => PreliminaryConfirm(true)}
                    >
                      Approve
                    </Button>
                    <Button
                      className="btn-danger mx-3"
                      onClick={() => PreliminaryConfirm(false)}
                    >
                      Reject
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="row">
          <div className="col p-4">
            <Carousel>
              {valuationRequest.valuationImagesUrls &&
                valuationRequest.valuationImagesUrls.map((image, index) => (
                  <Carousel.Item key={index}>
                    <img
                      className="d-fluid w-70 h-50 px-5"
                      src={image}
                      alt={`Slide ${index}`}
                    />
                  </Carousel.Item>
                ))}
            </Carousel>
          </div>
        </div>
      </div>
    </>
  );
};

export { FinancialProofRequestDetail, VIPFinancialProofRequestDetail };
