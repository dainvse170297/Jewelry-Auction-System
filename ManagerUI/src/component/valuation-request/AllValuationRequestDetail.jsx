import React, { useState } from "react";
import { Button, Carousel } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import axios from "axios";
import {
  postPreliminaryConfirm,
  postProductReceive,
} from "../../services/apiService.jsx";

export { ValuationRequested, PreliminaryValuated };

function ValuationRequested({ valuationRequest, staffId, onHide }) {
  const [preliminaryValuation, setPreliminaryValuation] = useState({
    id: "",
    estimateMin: "",
    estimateMax: "",
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

  const PreliminaryConfirm = async (e) => {
    try {
      const data = await postPreliminaryConfirm(
        valuationRequest.id,
        preliminaryValuation.estimateMin,
        preliminaryValuation.estimateMax,
        staffId
      );
      if (data.valuationStatus === "PRELIMINARY_VALUATED") {
        toast.success("Preliminary successfully");
        onHide(true);
      } else {
        console.log("Failed");
      }
    } catch (error) {
      console.log("Error:", error.message);
      toast.error("Error when sending preliminary valuation");
    }
  };

  return (
    <>
      <div className="col card">
        <div className="row">
          <h3 className="text-center">Valuation request detail</h3>
        </div>
        <div className="row px-5">
          {valuationRequest && (
            <>
              <div className="card card-body">
                <p>
                  Member Id: <strong>{valuationRequest.memberId}</strong>
                </p>
                <p>
                  Description: <strong>{valuationRequest.description}</strong>
                </p>
                <p>
                  Time request: <strong>{valuationRequest.timeRequest}</strong>
                </p>
                <p>
                  Valuation status:{" "}
                  <strong>{valuationRequest.valuationStatus}</strong>
                </p>
                <p>
                  Member estimate price:{" "}
                  <strong>{valuationRequest.memberEstimatePrice}$</strong>
                </p>
                <div className="col">
                  <div className="row mb-4">
                    <span className="text-center">
                      <strong>Preliminary valuation for request</strong>
                    </span>
                  </div>

                  <div className="row mb-3 mx-2 d-flex justify-content-center">
                    <div className="col-sm-6">
                      <Form.Label htmlFor="estimateMin">
                        Minimum Price <span style={{ color: "red" }}>*</span>
                      </Form.Label>
                    </div>
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
                  </div>

                  <div className="row mb-3 mx-2 d-flex justify-content-center">
                    <div className="col-sm-6">
                      <Form.Label htmlFor="estimateMax">
                        New Maximum Price{" "}
                        <span style={{ color: "red" }}>*</span>
                      </Form.Label>
                    </div>
                    <div className="col-sm-6">
                      <Form.Control
                        type="number"
                        id="estimateMax"
                        aria-describedby="passwordHelpBlock"
                        name="estimateMax"
                        value={preliminaryValuation.estimateMax}
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
                      Send preliminary valuation
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

function PreliminaryValuated({ valuationRequest, staffId, onHide }) {
  const handleConfirm = async (e) => {
    try {
      const data = await postProductReceive(valuationRequest.id);

      if (data.valuationStatus === "PRODUCT_RECEIVED") {
        toast.success("Confirm product received successfully");
        onHide(true);
      } else {
        console.log("Failed");
      }
    } catch (error) {
      console.log("Error:", error.message);
      toast.error("Error when confirm product received");
    }
  };

  return (
    <>
      <div className="col card">
        <div className="row">
          <h3 className="text-center">Valuation request detail</h3>
        </div>
        <div className="row px-5">
          {valuationRequest && (
            <>
              <div className="card card-body">
                <p>
                  Member Id: <strong>{valuationRequest.memberId}</strong>
                </p>
                <p>
                  Description: <strong>{valuationRequest.description}</strong>
                </p>
                <p>
                  Time request: <strong>{valuationRequest.timeRequest}</strong>
                </p>
                <p>
                  Valuation status:{" "}
                  <strong>{valuationRequest.valuationStatus}</strong>
                </p>
                <p>
                  Member estimate price:{" "}
                  {valuationRequest.memberEstimatePrice === null ? (
                    <strong>No</strong>
                  ) : (
                    <strong>{valuationRequest.memberEstimatePrice}$</strong>
                  )}
                </p>
                <p>
                  Preliminary price min:{" "}
                  <strong>{valuationRequest.estimatePriceMin}$</strong>
                </p>
                <p>
                  Preliminary price max:{" "}
                  <strong>{valuationRequest.estimatePriceMax}$</strong>
                </p>
                <div className="col">
                  <div className="row-sm-9 d-flex justify-content-center">
                    <Button className="btn-success" onClick={handleConfirm}>
                      Confirm product received
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
