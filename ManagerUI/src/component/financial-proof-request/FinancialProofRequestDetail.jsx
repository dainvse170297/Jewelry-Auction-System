import React, { useState } from "react";
import { Button, Carousel } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import Form from "react-bootstrap/Form";
import { postSetAmountFinancialProof } from "../../services/apiService";

function FinancialProofRequestDetail({ valuationRequest, onHide, staffId }) {
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
      if (name === "estimateMin")
        toast.error(`Estimate minimum price is required`);
      if (name === "estimateMax")
        toast.error(`Estimate maximum price is required`);
    }
  };

  const PreliminaryConfirm = async () => {
    try {
      const data = await postSetAmountFinancialProof(
        valuationRequest.id,
        staffId,
        preliminaryValuation.financialProofAmount
      );

      if (data.status === "AVAILABLE") {
        toast.success("Financial Proof Successfully");
        onHide(true);
      }
      if (data.status === "PENDING_MANAGER_APPROVAL") {
        toast.success("Financial Proof Sent to Manager for Approval");
        onHide(true);
      } else {
        console.log("Failed");
      }
    } catch (error) {
      console.log("Error:", error.message);
      toast.error("Error When Sending Financial Proof");
    }
  };

  return (
    <>
      <div className="col card">
        <div className="row">
          <h3 className="text-center"> Financial Proof detail</h3>
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
                  Time request: <strong>{valuationRequest.timeRequest}</strong>
                </p>
                <p>
                  Valuation status: <strong>{valuationRequest.status}</strong>
                </p>
                <p>
                  Financial Proof Amount:{" "}
                  <strong>{valuationRequest.financialProofAmount}$</strong>
                </p>
                <div className="col">
                  <div className="row mb-4">
                    <span className="text-center">
                      <strong>Set Amount Financial Proof</strong>
                    </span>
                  </div>

                  {/* <div className="row mb-3 mx-2 d-flex justify-content-center">
                    <div className="col-sm-6"></div>
                    <div className="col-sm-6">
                      <Form.Control
                        type="number"
                        id="estimateMin"
                        aria-describedby="passwordHelpBlock"
                        name="estimateMin"
                        value={preliminaryValuation.estimateMin}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                      />
                    </div>
                  </div> */}

                  <div className="row mb-3 mx-2 d-flex justify-content-center">
                    <div className="col-sm-6">
                      <Form.Label htmlFor="estimateMax">
                        Set Amount <span style={{ color: "red" }}>*</span>
                      </Form.Label>
                    </div>
                    <div className="col-sm-6">
                      <Form.Control
                        type="number"
                        id="financialProofAmount"
                        aria-describedby="passwordHelpBlock"
                        name="financialProofAmount"
                        value={preliminaryValuation.financialProofAmount}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                      />
                    </div>
                  </div>

                  <div className="row-sm-9 d-flex justify-content-center">
                    <Button
                      className="btn-success"
                      onClick={PreliminaryConfirm}
                    >
                      Set Amount
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
              {valuationRequest.financialProofImages &&
                valuationRequest.financialProofImages.map((image, index) => (
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
}

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
                  Time request: <strong>{valuationRequest.timeRequest}</strong>
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
