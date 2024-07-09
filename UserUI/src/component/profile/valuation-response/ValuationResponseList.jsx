import React, { useEffect, useState } from "react";
import "./valuationResponseList.scss";
import DownIcon from "@mui/icons-material/FileDownload";
import { ToastContainer, toast } from "react-toastify";
import {
  getValuationRepsonse,
  postConfirmFinalValuation,
} from "../../../services/apiService";
import FullScreenImage from "../../../views/image/FullScreenImage";

const ValuationResponseList = ({ id }) => {
  const [data, setData] = useState(null);
  const [confirm, setConfirm] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(false);
  const [message, setMessage] = useState("");
  const [onHide, setOnHide] = useState(true);
  const [onHide2, setOnHide2] = useState(true);

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
        const response = await getValuationRepsonse(id);
        setData(response);
      } catch (error) {
        console.log("Error at fetchRequest: ", error);
      }
    };

    fetchRequest();
  }, [id]);

  async function handleConfirm(inpId, inpStatus) {
    try {
      const data = postConfirmFinalValuation(inpId, inpStatus);
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
          <div className="row">
            {/* Response list */}
            <div className="">
              <div className="row d-flex justify-content-center">
                <h4 className="text-center">Valuation Request</h4>
              </div>
              <div className="row">
                <div className="col px-5">
                  {/* Show response valuation request */}
                  {data?.responseRequestValuationDTOS.map((response, index) => (
                    <div key={index}>
                      {(response.status === "FINAL" ||
                        response.status === "REJECTED" ||
                        response.status === "ACCEPTED") && (
                        <div className="finalValuate row">
                          <p className="d-inline-flex justify-content-center">
                            <button
                              type="button"
                              className="row btn btn-light"
                              data-bs-toggle="collapse"
                              data-bs-target="#final"
                              aria-controls="final"
                              onClick={() => setOnHide2(!onHide2)}
                              style={{ width: "100%" }}
                            >
                              <div className="col d-flex justify-content-between">
                                <strong>Final valuation of your jewelry</strong>
                                <DownIcon />
                              </div>
                            </button>
                          </p>
                          <div hidden={onHide2} id="final">
                            <div className="card card-body">
                              <p>This is your final valuation</p>
                              {data.productDTO && (
                                <>
                                  <p>
                                    Min Estimate:{" "}
                                    <strong>
                                      {data.productDTO.estimatePriceMin}$
                                    </strong>{" "}
                                  </p>
                                  <p>
                                    Max Estimate:{" "}
                                    <strong>
                                      {data.productDTO.estimatePriceMax}$
                                    </strong>{" "}
                                  </p>
                                  <p>
                                    Details info:{" "}
                                    <strong>
                                      {data.productDTO.name} -{" "}
                                      {data.productDTO.description}{" "}
                                    </strong>{" "}
                                  </p>
                                </>
                              )}

                              <p>
                                Some beautiful images of your jewelry that we
                                take:{" "}
                              </p>
                              <div>
                                {data.productDTO &&
                                  data.productDTO.productImages && (
                                    <FullScreenImage
                                      imageUrls={data.productDTO.productImages.map(
                                        (image) => image
                                      )}
                                    />
                                  )}
                              </div>
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
                                            handleConfirm(
                                              data.valuationRequestDTO.id,
                                              true
                                            )
                                          }
                                          className="btn btn-success mx-3 px-5"
                                        >
                                          Accept
                                        </button>
                                        <button
                                          type="button"
                                          value={currentStatus}
                                          onClick={() =>
                                            handleConfirm(
                                              data.valuationRequestDTO.id,
                                              false
                                            )
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
                        <>
                          <div className="Preliminary row my-3 px-3 d-flex justify-content-center">
                            <button
                              type="button"
                              className="row btn btn-light"
                              data-bs-toggle="collapse"
                              data-bs-target="#collapse2"
                              aria-controls="collapse2"
                              onClick={() => setOnHide(!onHide)}
                              style={{ width: "100%" }}
                            >
                              <div className="col d-flex justify-content-between">
                                <strong>
                                  Preliminary valuation of your jewelry
                                </strong>
                                <DownIcon />
                              </div>
                            </button>
                            <div
                              className="collapse2"
                              id="collapse2"
                              hidden={onHide}
                            >
                              <div className="card card-body px-5 mt-3">
                                <div className="row">
                                  We have received information about your
                                  jewelry, from there, our team of experts has
                                  given a preliminary valuation for it. The
                                  preliminary valuation value for your jewelry
                                  is:
                                </div>
                                <div className="row">
                                  <div className="col-sm-8 ">
                                    <p className="my-3">
                                      Min Estimate:{" "}
                                      <strong>
                                        {data.estimatePriceMax.estimatePriceMin}
                                        $
                                      </strong>{" "}
                                    </p>
                                    <p className="my-3">
                                      Max Estimate:{" "}
                                      <strong>
                                        {data.estimatePriceMax.estimatePriceMax}
                                        $
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
                                      Lot E2a-7, Street D1, D. D1 Long Thanh My,
                                      Thu Duc City Ho Chi Minh
                                    </strong>
                                  </p>
                                </div>

                                <div className="row">
                                  Our team will provide a final valuation of
                                  your jewelry upon receipt of the product. You
                                  will receive a response as soon as possible.
                                  To ensure the product is shipped safely, we
                                  provide you with product insurance information
                                  as well as packing instructions below.
                                </div>
                                <div className="row">
                                  <a href="/delivery" className="my-3">
                                    Packing and insurance instructions
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
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ValuationResponseList;
