import React, { useState } from "react";
import { Button, Modal, Form, Carousel } from "react-bootstrap";
import { toast } from "react-toastify";
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

  const PreliminaryConfirm = async () => {
    try {
      if (
        userRole === "MANAGER" &&
        financialProofRequest.status === "PENDING_MANAGER_APPROVAL"
      ) {
        const data = await confirmVIP(true); // Assuming this function exists for manager actions
        if (data !== null) {
          toast.success("Approve successfully");
          setTimeout(() => {
            window.location.reload(); // Reload page to remove modal
          }, 1000);
        } else {
          toast.error("Failed to confirm VIP");
        }
      } else {
        // Regular staff or manager action for setting financial proof amount
        const data = await postSetAmountFinancialProof(
          financialProofRequest.id,
          staffId,
          preliminaryValuation.financialProofAmount,
          userRole
        );
        if (data.status === "AVAILABLE") {
          toast.success("Financial Proof Successfully Set");
          onHide(true); // Hide modal
          setTimeout(() => {
            window.location.reload(); // Reload page to remove modal
          }, 1000);
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
      const data = await postConfirmVIPFinancialProof(
        financialProofRequest.id,
        staffId,
        confirmValue
      );

      if (data !== null) {
        if (confirmValue && data.status === "AVAILABLE") {
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
            <Button variant="success" onClick={PreliminaryConfirm}>
              Set Amount
            </Button>
          )
        )}
      </Modal.Footer>
    </>
  );
};

export { FinancialProofRequestDetail };
