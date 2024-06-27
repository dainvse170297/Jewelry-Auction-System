import React, { useState } from "react";
import { Button, Carousel } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import axios from "axios";

export { ValuationRequested };

function ValuationRequested({ valuationRequest, onHide }) {
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
      const formData = new FormData();

      formData.append("id", valuationRequest.id);
      formData.append("estimateMin", preliminaryValuation.estimateMin);
      formData.append("estimateMax", preliminaryValuation.estimateMax);
      // formData.append("staffId", 1);
      console.log("id", preliminaryValuation.id);
      console.log("estimateMin", preliminaryValuation.estimateMin);
      console.log("estimateMax", preliminaryValuation.estimateMax);

      //Default staff id
      formData.append("staffId", 1);

      const response = await axios.post(
        `http://localhost:8080/valuation/preliminary-valuation`,
        formData
      );

      if (
        response.status === 200 &&
        response.data.valuationStatus === "PRELIMINARY_VALUATED"
      ) {
        console.log("Success");
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
