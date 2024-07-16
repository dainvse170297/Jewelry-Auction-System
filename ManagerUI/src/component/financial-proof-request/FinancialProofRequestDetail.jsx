import React, { useState } from "react";
import { Button, Modal, Form, Carousel } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import {
  postSetAmountFinancialProof,
  postConfirmVIPFinancialProof,
} from "../../services/apiService";

import moment from "moment";
import FullScreenImage from "../../view/image/FullScreenImage";

const FinancialProofRequestDetail = ({
  financialProofRequest,
  onHide,
  staffId,
  userRole,
}) => {
  console.log("financialProofRequest", financialProofRequest);
  const [preliminaryValuation, setPreliminaryValuation] = useState({
    id: "",
    financialProofAmount: "",
  });
  const imageUrls = financialProofRequest.financialProofImages?.map(
    (image) => image
  );
  console.log("imageUrls", imageUrls);

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

  const PreliminaryConfirm = async (isApprove) => {
    try {
      console.log("PreliminaryConfirm called with isApprove:", isApprove);
      if (
        userRole === "MANAGER" &&
        financialProofRequest.status === "PENDING_MANAGER_APPROVAL"
      ) {
        const data = await postConfirmVIPFinancialProof(
          financialProofRequest.id,
          staffId,
          isApprove
        );

        if (data !== null) {
          toast.success(
            isApprove ? "Approved successfully" : "Rejected successfully"
          );
          console.log("toast check", data);
          setTimeout(() => {
            window.location.reload(); // Reload page to remove modal
          }, 2500);
        } else {
          toast.error("Failed to confirm VIP");
        }
      } else {
        const data = await postSetAmountFinancialProof(
          financialProofRequest.id,
          staffId,
          preliminaryValuation.financialProofAmount,
          userRole
        );
        if (data.status === "AVAILABLE") {
          console.log("toast check", data);
          toast.success("Financial Proof Set Successfully");
          // onHide(true); // Hide modal
          setTimeout(() => {
            window.location.reload(); // Reload page to remove modal
          }, 2500);
        } else if (data.status === "PENDING_MANAGER_APPROVAL") {
          toast.success("Financial Proof Sent to Manager for Approval");
          setTimeout(() => {
            window.location.reload(); // Reload page to remove modal
          }, 2500);
        } else {
          toast.error("Failed to set Financial Proof");
        }
      }
    } catch (error) {
      console.log("Error:", error.message);
      toast.error("Error When Setting Financial Proof");
    }
  };

  const canSetAmount = () => {
    if (userRole === "MANAGER") {
      return (
        financialProofRequest.status === "REQUESTED" ||
        financialProofRequest.status === "PENDING_MANAGER_APPROVAL"
      );
    } else if (userRole === "STAFF") {
      return financialProofRequest.status === "REQUESTED";
    }
    return false;
  };

  return (
    <>
      <ToastContainer />
      <div className="card card-body">
        <p>
          Member Id: <strong>{financialProofRequest.memberId}</strong>
        </p>
        <p>
          Time request:{" "}
          <strong>
            {moment(financialProofRequest.timeRequest).format(
              "DD/MM/YYYY HH:mm:ss"
            )}
          </strong>
        </p>
        <p>
          Valuation status: <strong>{financialProofRequest.status}</strong>
        </p>

        {financialProofRequest.status !== "REQUESTED" && (
          <>
            <p>
              Financial Proof Amount:{" "}
              <strong>{financialProofRequest.financialProofAmount}$</strong>
            </p>
          </>
        )}

        <div className="row mb-3 mx-2 d-flex justify-content-center">
          <div className="col-sm-6">
            {(userRole === "MANAGER" &&
              financialProofRequest.status === "PENDING_MANAGER_APPROVAL") ||
            (userRole === "STAFF" &&
              financialProofRequest.status === "PENDING_MANAGER_APPROVAL") ||
            financialProofRequest.status === "AVAILABLE" ||
            financialProofRequest.status === "REJECTED" ||
            financialProofRequest.status === "CANCELED" ? null : (
              <Form.Label htmlFor="financialProofAmount">
                Set Amount <span style={{ color: "red" }}>*</span>
              </Form.Label>
            )}
          </div>
          <div className="col-sm-6">
            {(userRole === "MANAGER" &&
              financialProofRequest.status === "PENDING_MANAGER_APPROVAL") ||
            (userRole === "STAFF" &&
              financialProofRequest.status === "PENDING_MANAGER_APPROVAL") ||
            financialProofRequest.status === "AVAILABLE" ||
            financialProofRequest.status === "REJECTED" ||
            financialProofRequest.status === "CANCELED" ? null : (
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

      {financialProofRequest.financialProofImages && (
        <>
          <FullScreenImage imageUrls={imageUrls} />
        </>
      )}

      <Modal.Footer>
        <ToastContainer />
        <Button variant="secondary" onClick={() => onHide(false)}>
          Close
        </Button>
        {userRole === "MANAGER" &&
        financialProofRequest.status === "PENDING_MANAGER_APPROVAL" ? (
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
            <Button variant="success" onClick={() => PreliminaryConfirm(false)}>
              Set Amount
            </Button>
          )
        )}
      </Modal.Footer>
    </>
  );
};

export { FinancialProofRequestDetail };
