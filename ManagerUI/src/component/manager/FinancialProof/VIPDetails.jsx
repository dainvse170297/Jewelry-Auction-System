import React, { useState } from "react";
import { Button, Carousel } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";

export default function VIPDetails({ valuationRequest, onHide }) {
  const PreliminaryConfirm = async (b) => {
    try {
      const formData = new FormData();

      formData.append("id", valuationRequest.id);
      formData.append("managerId", 1);
      formData.append("confirm", b);

      const response = await axios.post(
        `http://localhost:8080/financial-proof/confirm-vip`,
        formData
      );

      if (response.status === 200 && response.data.status === "AVAILABLE") {
        console.log("Success");
        toast.success("Aprrove successfully");
        onHide(true);
      }
      if (response.status === 200 && response.data.status === "REJECTED") {
        console.log("Success");
        toast.success("Reject successfully");
        onHide(true);
      } else {
        console.log("Failed");
      }
    } catch (error) {
      console.log("Error:", error.message);
      toast.error("Error when confirm financial proof");
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
}
