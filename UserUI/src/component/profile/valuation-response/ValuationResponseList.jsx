import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import "./valuationResponseList.scss";
import DownIcon from "@mui/icons-material/FileDownload";
import { ToastContainer, toast } from "react-toastify";
import { Toast } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";

const ValuationResponseList = ({ id }) => {
  const [data, setData] = useState(null);
  const [confirm, setConfirm] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (currentStatus === "Accept") {
      setMessage("You have accepted this valuation");
    } else if (currentStatus === "Reject") {
      setMessage("You have rejected this valuation");
    }
  }, [currentStatus]);

  useEffect(() => {
    if (confirm === "true") {
      setMessage("You have accepted this valuation");
    }
    if (confirm === "false") {
      setMessage("You have rejected this valuation");
    }
  }, [confirm]);

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/response/view-valuation-response/${id}`
        );
        setData(response.data);
      } catch (error) {
        console.log("Error at fetchRequest: ", error);
      }
    };

    fetchRequest();
  }, [id]);

  async function handleConfirm(inpId, inpStatus) {
    try {
      const param = new URLSearchParams();

      param.append("id", inpId);
      if (inpStatus === true) {
        console.log("Accept");
        param.append("status", true);
      } else {
        console.log("Reject");
        param.append("status", false);
      }

      const re = await axios.post(
        `http://localhost:8080/response/confirm-final-valuation-by-member`,
        param
      );
      console.log(re.data);
      setMessage(inpStatus ? "Accepted" : "Rejected");
      setConfirm(true);
      toast.success("Success confirm");
    } catch (error) {
      toast.error("Something went wrong!");
      console.log("Error at fetchRequest: ", error);
    }
  }

  return (
    <div>
      <ToastContainer />
      {data && (
        <div className="container valuationResponseList container-fluid">
          {/* <div className="row d-flex justify-content-center">
            <h2>Valuation Response List</h2>
          </div> */}
          <div className="row">
            {/* Response list */}
            <div className="">
              <div className="row d-flex justify-content-center">
                <h4 className="text-center">Valuation Request</h4>
              </div>
              <div className="row">
                <div className="col px-5">
                  {/* Show response valuation request */}
                  {data.responseRequestValuationDTOS.map((response, index) => (
                    <div key={index}>
                      {(response.status === "FINAL" ||
                        response.status === "REJECTED" ||
                        response.status === "ACCEPTED") && (
                          <div className="finalValuate row my-3">
                            <p className="d-inline-flex justify-content-center">
                              <button
                                type="button"
                                className="row btn btn-light"
                                data-bs-toggle="collapse"
                                data-bs-target="#final"
                                aria-expanded="false"
                                aria-controls="final"
                              >
                                <div className="px-5">
                                  Final valuation of your product
                                  <DownIcon />
                                </div>
                              </button>
                            </p>
                            <div className="" id="final">
                              <div className="card card-body">
                                <p>This is your final valuation</p>
                                <p>{data.valuationRequestDTO.description}</p>
                                <p>
                                  Min Estimate:{" "}
                                  <strong>{response.valuationPriceMin}$</strong>{" "}
                                </p>
                                <p>
                                  Max Estimate:{" "}
                                  <strong>{response.valuationPriceMax}$</strong>{" "}
                                </p>
                                <p>
                                  Do you want to start your own Jewelry Auction?{" "}
                                </p>
                                <div className="d-inline-flex justify-content-center">
                                  {response.status === "FINAL" && (
                                    <div>
                                      {!confirm && (
                                        <div>
                                          <button
                                            type="button"
                                            value={currentStatus}
                                            onClick={() =>
                                              handleConfirm(response.id, true)
                                            }
                                            className="btn btn-success mx-3 px-5"
                                          >
                                            Accept
                                          </button>
                                          <button
                                            type="button"
                                            value={currentStatus}
                                            onClick={() =>
                                              handleConfirm(response.id, false)
                                            }
                                            className="btn btn-danger mx-3 px-5"
                                          >
                                            Reject
                                          </button>
                                        </div>
                                      )}
                                      {confirm && (
                                        <div>
                                          <p>{message}</p>
                                        </div>
                                      )}
                                    </div>
                                  )}

                                  {response.status === "REJECTED" && (
                                    <>
                                      <div className="row">
                                        You have rejected this valuation
                                      </div>
                                    </>
                                  )}

                                  {response.status === "ACCEPTED" && (
                                    <>
                                      <div className="row">
                                        You have accepted this valuation
                                      </div>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                      {response.status === "PRELIMINARY" && (
                        <div className="Preliminary row  my-3">
                          <p className="d-inline-flex justify-content-center">
                            <button
                              type="button"
                              className="row btn btn-light"
                              data-bs-toggle="collapse"
                              data-bs-target="#collapse2"
                              aria-expanded="false"
                              aria-controls="collapse2"
                            >
                              <div className="px-5">
                                Preliminary valuation of your product
                                <DownIcon />
                              </div>
                            </button>
                          </p>
                          <div className="collapse2" id="collapse2">
                            <div className="card card-body px-5">
                              <div className="row">
                                We have received information about your jewelry,
                                from there, our team of experts has given a
                                preliminary valuation for it. The preliminary
                                valuation value for your jewelry is:
                              </div>
                              <div className="row">
                                <div className="col-sm-8 ">
                                  <p className="my-3">
                                    Min Estimate:{" "}
                                    <strong>
                                      {response.valuationPriceMin}$
                                    </strong>{" "}
                                  </p>
                                  <p className="my-3">
                                    Max Estimate:{" "}
                                    <strong>
                                      {response.valuationPriceMax}$
                                    </strong>{" "}
                                  </p>
                                </div>
                              </div>

                              <div className="row">
                                If you agree with our preliminary valuation,
                                please send your jewelry to:
                              </div>

                              <div className="row">
                                <p className="my-3">
                                  <strong>
                                    999 - SSS street - HO CHI MINH City
                                  </strong>
                                </p>
                              </div>

                              <div className="row">
                                Our team will provide a final valuation of your
                                jewelry upon receipt of the product. You will
                                receive a response as soon as possible. To
                                ensure the product is shipped safely, we provide
                                you with product insurance information as well
                                as packing instructions below.
                              </div>
                              <div className="row">
                                <a href="/home" className="my-3">
                                  Insurance information
                                </a>
                              </div>

                              <div className="row">
                                We look forward to receiving the product from
                                you as soon as possible. <br />
                                Thank you very much!
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Request list */}
            {/* <div className="col-sm-4">
              <h4 className="text-center">Valuation Request</h4>
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default ValuationResponseList;
