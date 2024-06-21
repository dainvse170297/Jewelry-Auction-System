import React, { useState } from "react";
import { Button, Carousel } from "react-bootstrap";
import { Form } from "react-router-dom";

const AllValuationRequestDetail = ({ valuationRequest }) => {
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

      formData.append("id", preliminaryValuation.id);
      formData.append("estimateMin", preliminaryValuation.estimateMin);
      formData.append("estimateMax", preliminaryValuation.estimateMax);

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
        setValuationRequests(
          valuationRequests.filter((request) => request.id !== response.data.id)
        );
        setCurrentItemsDetail(null);
      } else {
        console.log("Failed");
      }
    } catch (error) {
      console.log("Error:", error.message);
      toast.error("Error when sending preliminary valuation");
    }
  };

  if (valuationRequest === null) return <h1>Valuation request not found</h1>;
  let content;
  switch (valuationRequest.valuationStatus) {
    case `REQUESTED`:
      content = (
        <>
          <div className="row">
            <h3 className="text-center">Valuation request detail</h3>
          </div>
          <div className="row">
            <Carousel>
              {valuationRequest.valuationImagesUrls &&
                valuationRequest.valuationImagesUrls.map((image, index) => (
                  <Carousel.Item key={index}>
                    <img
                      className="d-block w-100"
                      src={image}
                      alt={`Slide ${index}`}
                    />
                  </Carousel.Item>
                ))}
            </Carousel>
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
                    Time request:{" "}
                    <strong>{valuationRequest.timeRequest}</strong>
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
        </>
      );
      break;

    default:
      content = null;
      break;
  }

  return content;
};

export default AllValuationRequestDetail;
