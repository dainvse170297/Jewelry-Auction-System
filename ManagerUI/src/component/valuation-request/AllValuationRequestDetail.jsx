import React, { useState, useEffect } from "react";
import { Modal, Button, Carousel, Spinner } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { ToastContainer, toast } from "react-toastify";
import "./valuationRequest.scss";
import moment from "moment";
import FullScreenImage from "../../view/image/FullScreenImage.jsx";
import Confirm from "../../view/confirm/Confirm.jsx";
import { Link } from "react-router-dom";

import {
  postPreliminaryConfirm,
  postProductReceive,
  postAproveFinalValuation,
  postSendFinalValuationToMember,
  getValuationRequestById,
  getRejectValuationRequest,
  getProductDetailByRequestId,
  postCancelFinalValuation,
} from "../../services/apiService.jsx";

export {
  ValuationRequested,
  PreliminaryValuated,
  PendingApproval,
  ManagerApproved,
  ProductReceived,
  OneValuationRequestDetail,
  OneProductDetail,
};

function OneValuationRequestDetail({ valuationRequestId }) {
  const [valuationRequest, setValuationRequest] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const [urlList, setUrlList] = useState([]);
  const handleClose = () => setShow(false);

  const handleImageClick = (imageUrl) => {
    setSelectedImageUrl(imageUrl);
  };

  const handleImageClose = () => {
    setSelectedImageUrl(null);
  };

  const handleShow = () => {
    try {
      const getData = async () => {
        const data = await getValuationRequestById(valuationRequestId);
        setValuationRequest(data);
        data.valuationImagesUrls && setUrlList(data.valuationImagesUrls);
      };
      getData();
    } catch (error) {
      console.log("Error: ", error);
    }
    setShow(true);
  };

  return (
    <>
      <Button
        onClick={handleShow}
        className="btn btn-primary mx-3"
        type="button"
      >
        Request Details
      </Button>
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Valuation request detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!valuationRequest && (
            <div className="productInfo">
              <h3>Valuation request not found</h3>
            </div>
          )}
          {valuationRequest && (
            <div className="productInfo">
              <p>{valuationRequest.description}</p>

              <div className="d-flex justify-content-between">
                <p className="m-0">Time request: </p>
                <strong>
                  {moment(valuationRequest.timeRequest).format(
                    "DD/MM/YYYY HH:mm:ss"
                  )}
                </strong>
              </div>
              <hr className="p-0 mb-2 mt-0" />
              <div className="d-flex justify-content-between">
                <p className="m-0">Valuation status: </p>
                <strong>{valuationRequest.valuationStatus}</strong>
              </div>
              <hr className="p-0 mb-2 mt-0" />
              <div className="d-flex justify-content-between">
                <p className="mb-1">Member estimated price:</p>
                {valuationRequest.memberEstimatePrice === -1 ||
                valuationRequest.memberEstimatePrice === null ? (
                  <strong>No</strong>
                ) : (
                  <strong>${valuationRequest.memberEstimatePrice}</strong>
                )}
              </div>
              <hr className="p-0 mb-1 mt-0" />
              <div className="d-flex justify-content-between">
                <p className="mb-1">Estimated Price:</p>
                <strong>
                  ${valuationRequest.estimatePriceMin} - $
                  {valuationRequest.estimatePriceMax}
                </strong>
              </div>
              <hr className="p-0 mb-1 mt-0" />
              <div className="productImages">
                <div className="productImages">
                  {valuationRequest.valuationImagesUrls &&
                    Array.isArray(valuationRequest.valuationImagesUrls) && (
                      <FullScreenImage imageUrls={urlList} />
                    )}
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
      <Modal show={!!selectedImageUrl} onHide={handleImageClose}>
        <Modal.Header closeButton>
          <Modal.Title>Product Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={selectedImageUrl}
            alt="Selected Product"
            style={{ width: "100%" }}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}

function OneProductDetail({ valuationRequestId }) {
  const [productInfo, setProductInfo] = useState({});
  const [show, setShow] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const [urlList, setUrlList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => setShow(false);

  const handleImageClick = (imageUrl) => {
    setSelectedImageUrl(imageUrl);
  };
  const handleImageClose = () => {
    setSelectedImageUrl(null);
  };

  const handleShow = () => {
    const fetchValuationRequest = async () => {
      try {
        const data = await getProductDetailByRequestId(valuationRequestId);
        if (data !== null) {
          setProductInfo(data);
          data.productImages &&
            setUrlList(data.productImages.map((i) => i.imageUrl));
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    };
    fetchValuationRequest();
    setShow(true);
  };
  return (
    <>
      <ToastContainer />
      <Button
        onClick={handleShow}
        className="btn btn-primary mx-3"
        type="button"
      >
        Jewelry Details
      </Button>
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Valuation request detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!productInfo && (
            <div className="productInfo">
              <h3>Product not found</h3>
            </div>
          )}
          {productInfo && (
            <div className="productInfo">
              <h3>{productInfo.productName}</h3>
              <p>{productInfo.description}</p>
              <div className="d-flex justify-content-between">
                <p className="mb-1">Estimated Price:</p>
                <strong>
                  ${productInfo.estimatePriceMin} - $
                  {productInfo.estimatePriceMax}
                </strong>
              </div>
              <hr className="p-0 mb-1 mt-0" />
              <div className="d-flex justify-content-between">
                <p className="mb-1">Start price:</p>
                <strong>${productInfo.startPrice}</strong>
              </div>
              <hr className="p-0 mb-1 mt-0" />
              <div className="d-flex justify-content-between">
                <p className="mb-1">Buy now price:</p>
                <strong>${productInfo.buyNowPrice}</strong>
              </div>
              <hr className="p-0 mb-1 mt-0" />
              <div className="d-flex justify-content-between">
                <p className="mb-1">Maximum bid step:</p>
                <strong>{productInfo.maxStep}</strong>
              </div>
              <hr className="p-0 mb-1 mt-0" />
              <div className="d-flex justify-content-between">
                <p className="mb-1">Amount for each bid step:</p>
                <strong>${productInfo.pricePerStep}</strong>
              </div>
              <hr className="p-0 mb-1 mt-0" />
              <div className="d-flex justify-content-between">
                <p className="mb-1">Current status:</p>
                <strong>{productInfo.status}</strong>
              </div>
              <hr className="p-0 mb-1 mt-0" />
              <div className="productImages">
                <div className="productImages">
                  {productInfo.productImages &&
                    Array.isArray(productInfo.productImages) && (
                      <FullScreenImage imageUrls={urlList} />
                    )}
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>

      <Modal show={!!selectedImageUrl} onHide={handleImageClose}>
        <Modal.Header closeButton>
          <Modal.Title>Product Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={selectedImageUrl}
            alt="Selected Product"
            style={{ width: "100%" }}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}

function ValuationRequested({ valuationRequestId }) {
  const [valuationRequest, setValuationRequest] = useState({});
  const [preliminaryValuation, setPreliminaryValuation] = useState({
    id: "",
    estimateMin: "",
    estimateMax: "",
  });

  const [show, setShow] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const [urlList, setUrlList] = useState([]);
  const handleClose = () => setShow(false);

  const handleImageClick = (imageUrl) => {
    setSelectedImageUrl(imageUrl);
  };

  const handleImageClose = () => {
    setSelectedImageUrl(null);
  };

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

  //Get data of valuation request
  const handleShow = () => {
    try {
      const getData = async () => {
        const data = await getValuationRequestById(valuationRequestId);
        setValuationRequest(data);
        data.valuationImagesUrls && setUrlList(data.valuationImagesUrls);
      };
      getData();
    } catch (error) {
      console.log("Error: ", error);
    }
    setShow(true);
  };

  const handleReject = async (confirmValue) => {
    if (confirmValue) {
      try {
        const data = await getRejectValuationRequest(valuationRequest.id);
        console.log("data", data);
        if (data) {
          setShow(false);
          toast.success("Rejected successfully");
        } else {
          console.log("Failed");
        }
      } catch (error) {
        console.log("Error:", error.message);
        toast.error("Error when reject valuation request");
      }
    }
  };

  const PreliminaryConfirm = async (e) => {
    if (
      preliminaryValuation.estimateMin === "" ||
      preliminaryValuation.estimateMax === ""
    ) {
      toast.error("Please fill in all required fields");
      return;
    } else if (
      preliminaryValuation.estimateMin <= 0 ||
      preliminaryValuation.estimateMax <= 0
    ) {
      toast.error("Price must be greater than 0");
      return;
    } else if (
      parseInt(preliminaryValuation.estimateMin) >=
      parseInt(preliminaryValuation.estimateMax)
    ) {
      console.log(
        "value: " + preliminaryValuation.estimateMin,
        "max: " + preliminaryValuation.estimateMax
      );
      toast.error("Minimum price must be less than maximum price");
      return;
    } else {
      try {
        const data = await postPreliminaryConfirm(
          valuationRequest.id,
          preliminaryValuation.estimateMin,
          preliminaryValuation.estimateMax,
          1
        );

        if (data.valuationStatus === "PRELIMINARY_VALUATED") {
          toast.success("Preliminary successfully");
          setTimeout(() => {
            setShow(false);
          }, 1000);
        } else {
          console.log("Failed");
        }
      } catch (error) {
        console.log("Error:", error.message);
        toast.error("Error when sending preliminary valuation");
      }
    }
  };

  return (
    <>
      <button onClick={handleShow} className="btn btn-primary" type="button">
        Detail
      </button>
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Valuation request detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {valuationRequest && (
            <div className="productInfo">
              <p>{valuationRequest.description}</p>

              <div className="d-flex justify-content-between">
                <p className="m-0">Time request: </p>
                <strong>
                  {moment(valuationRequest.timeRequest).format(
                    "DD/MM/YYYY HH:mm:ss"
                  )}
                </strong>
              </div>
              <hr className="p-0 mb-2 mt-0" />
              <div className="d-flex justify-content-between">
                <p className="m-0">Valuation status: </p>
                <strong>{valuationRequest.valuationStatus}</strong>
              </div>
              <hr className="p-0 mb-2 mt-0" />
              <div className="d-flex justify-content-between">
                <p className="mb-1">Member estimated price:</p>
                {valuationRequest.memberEstimatePrice === -1 ||
                valuationRequest.memberEstimatePrice === null ? (
                  <strong>No</strong>
                ) : (
                  <strong>${valuationRequest.memberEstimatePrice}</strong>
                )}
              </div>
              <hr className="p-0 mb-1 mt-0" />
              <div className="productImages">
                <div className="productImages">
                  {valuationRequest.valuationImagesUrls &&
                    Array.isArray(valuationRequest.valuationImagesUrls) && (
                      <FullScreenImage imageUrls={urlList} />
                    )}
                </div>
              </div>
            </div>
          )}

          <div className="row d-flex justify-content-center">
            <div className="col-10 ">
              <h5 className="text-center py-1">Preliminary valuation</h5>
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
                    New Maximum Price <span style={{ color: "red" }}>*</span>
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
              <Modal.Footer className="row-sm-9 d-flex justify-content-center">
                <Button
                  className="btn-success mx-2"
                  onClick={PreliminaryConfirm}
                >
                  Send preliminary valuation
                </Button>
                <Confirm
                  message="Are you sure you want to reject this valuation request?"
                  mainLabel="Reject the request"
                  className="danger"
                  labelYes="Yes"
                  labelNo="No"
                  onConfirm={handleReject}
                />
              </Modal.Footer>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Modal show={!!selectedImageUrl} onHide={handleImageClose}>
        <Modal.Header closeButton>
          <Modal.Title>Product Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={selectedImageUrl}
            alt="Selected Product"
            style={{ width: "100%" }}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}

function PreliminaryValuated({ valuationRequestId, staffId, onHide }) {
  const [valuationRequest, setValuationRequest] = useState({});
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const [urlList, setUrlList] = useState([]);
  const handleClose = () => setShow(false);
  const handleImageClick = (imageUrl) => {
    setSelectedImageUrl(imageUrl);
  };

  const handleImageClose = () => {
    setSelectedImageUrl(null);
  };

  const handleConfirm = async (e) => {
    setIsLoading(true);
    try {
      const data = await postProductReceive(valuationRequestId);

      if (data.valuationStatus === "PRODUCT_RECEIVED") {
        toast.success("Confirm product received successfully");
        setShow(false);
        window.location.reload();
      } else {
        console.log("Failed");
      }
    } catch (error) {
      console.log("Error:", error.message);
      toast.error("Error when confirm product received");
    }
    setIsLoading(false);
  };

  const handleShow = () => {
    try {
      const getData = async () => {
        const data = await getValuationRequestById(valuationRequestId);
        setValuationRequest(data);
        data.valuationImagesUrls && setUrlList(data.valuationImagesUrls);
      };
      getData();
    } catch (error) {
      console.log("Error: ", error);
    }
    setShow(true);
  };

  const handleReject = async (confirmValue) => {
    if (confirmValue) {
      setIsLoading(true);
      try {
        const data = await getRejectValuationRequest(valuationRequestId);
        console.log("data", data);
        if (data) {
          setShow(false);
          window.location.reload();
          toast.success("Rejected successfully");
        } else {
          console.log("Failed");
        }
      } catch (error) {
        console.log("Error:", error.message);
        toast.error("Error when reject valuation request");
      }
      setIsLoading(false);
    }
  };

  return (
    <>
      <button onClick={handleShow} className="btn btn-primary" type="button">
        Detail
      </button>
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Valuation request detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {valuationRequest && (
            <div className="productInfo">
              <p>{valuationRequest.description}</p>

              <div className="d-flex justify-content-between">
                <p className="m-0">Time request: </p>
                <strong>
                  {moment(valuationRequest.timeRequest).format(
                    "DD/MM/YYYY HH:mm:ss"
                  )}
                </strong>
              </div>
              <hr className="p-0 mb-2 mt-0" />
              <div className="d-flex justify-content-between">
                <p className="m-0">Valuation status: </p>
                <strong>{valuationRequest.valuationStatus}</strong>
              </div>
              <hr className="p-0 mb-2 mt-0" />
              <div className="d-flex justify-content-between">
                <p className="mb-1">Member estimated price:</p>
                {valuationRequest.memberEstimatePrice === -1 ||
                valuationRequest.memberEstimatePrice === null ? (
                  <strong>No</strong>
                ) : (
                  <strong>${valuationRequest.memberEstimatePrice}</strong>
                )}
              </div>
              <hr className="p-0 mb-1 mt-0" />
              <div className="d-flex justify-content-between">
                <p className="mb-1">Estimated Price:</p>
                <strong>
                  ${valuationRequest.estimatePriceMin} - $
                  {valuationRequest.estimatePriceMax}
                </strong>
              </div>
              <hr className="p-0 mb-1 mt-0" />
              <div className="productImages">
                <div className="productImages">
                  {valuationRequest.valuationImagesUrls &&
                    Array.isArray(valuationRequest.valuationImagesUrls) && (
                      <FullScreenImage imageUrls={urlList} />
                    )}
                </div>
              </div>
            </div>
          )}

          <Modal.Footer className="row-sm-9 d-flex justify-content-center">
            {isLoading ? (
              <Spinner animation="border" role="status" />
            ) : (
              <>
                <Button onClick={handleConfirm} className="btn-success mx-2">
                  Confirm product received
                </Button>

                <Confirm
                  message="Are you sure you want to reject this valuation request?"
                  mainLabel="Reject the request"
                  className="danger"
                  labelYes="Yes"
                  labelNo="No"
                  onConfirm={handleReject}
                />
              </>
            )}
          </Modal.Footer>
        </Modal.Body>
      </Modal>
      <Modal show={!!selectedImageUrl} onHide={handleImageClose}>
        <Modal.Header closeButton>
          <Modal.Title>Product Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={selectedImageUrl}
            alt="Selected Product"
            style={{ width: "100%" }}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}

function ProductReceived({ valuationRequestId }) {
  const [valuationRequest, setValuationRequest] = useState({});
  const [show, setShow] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const [urlList, setUrlList] = useState([]);
  const handleClose = () => setShow(false);
  const handleImageClick = (imageUrl) => {
    setSelectedImageUrl(imageUrl);
  };

  const handleImageClose = () => {
    setSelectedImageUrl(null);
  };

  const handleShow = () => {
    try {
      const getData = async () => {
        const data = await getValuationRequestById(valuationRequestId);
        setValuationRequest(data);
        data.valuationImagesUrls && setUrlList(data.valuationImagesUrls);
      };
      getData();
    } catch (error) {
      console.log("Error: ", error);
    }
    setShow(true);
  };

  return (
    <>
      <div className="d-flex justify-content-center">
        <Link
          to={`/valuation-request/product-received/confirm/${valuationRequestId}`}
        >
          <Button variant="success" className="mx-3">
            Setup
          </Button>
        </Link>
        <button
          onClick={handleShow}
          className="btn btn-primary mx-3"
          type="button"
        >
          Detail
        </button>
      </div>

      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Valuation request detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {valuationRequest && (
            <div className="productInfo">
              <p>{valuationRequest.description}</p>

              <div className="d-flex justify-content-between">
                <p className="m-0">Time request: </p>
                <strong>
                  {moment(valuationRequest.timeRequest).format(
                    "DD/MM/YYYY HH:mm:ss"
                  )}
                </strong>
              </div>
              <hr className="p-0 mb-2 mt-0" />
              <div className="d-flex justify-content-between">
                <p className="m-0">Valuation status: </p>
                <strong>{valuationRequest.valuationStatus}</strong>
              </div>
              <hr className="p-0 mb-2 mt-0" />
              <div className="d-flex justify-content-between">
                <p className="mb-1">Member estimated price:</p>
                {valuationRequest.memberEstimatePrice === -1 ||
                valuationRequest.memberEstimatePrice === null ? (
                  <strong>No</strong>
                ) : (
                  <strong>${valuationRequest.memberEstimatePrice}</strong>
                )}
              </div>
              <hr className="p-0 mb-1 mt-0" />
              <div className="productImages">
                <div className="productImages">
                  {valuationRequest.valuationImagesUrls &&
                    Array.isArray(valuationRequest.valuationImagesUrls) && (
                      <FullScreenImage imageUrls={urlList} />
                    )}
                </div>
              </div>
            </div>
          )}

          <div className="row d-flex justify-content-center">
            <Modal.Footer className="row-sm-9 d-flex justify-content-center">
              <Link
                to={`/valuation-request/product-received/confirm/${valuationRequestId}`}
              >
                <Button variant="success" className="mx-3">
                  Setup product information
                </Button>
              </Link>
            </Modal.Footer>
          </div>
        </Modal.Body>
      </Modal>
      <Modal show={!!selectedImageUrl} onHide={handleImageClose}>
        <Modal.Header closeButton>
          <Modal.Title>Product Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={selectedImageUrl}
            alt="Selected Product"
            style={{ width: "100%" }}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}

function PendingApproval({ valuationRequestId, onUpdate }) {
  const [productInfo, setProductInfo] = useState({});
  const [show, setShow] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const [urlList, setUrlList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => setShow(false);
  const handleImageClick = (imageUrl) => {
    setSelectedImageUrl(imageUrl);
  };
  const handleImageClose = () => {
    setSelectedImageUrl(null);
  };

  const handleApprove = async (confirmValue) => {
    console.log("confirmValue", valuationRequestId);
    if (!confirmValue) return;
    setIsLoading(true);
    try {
      const id = valuationRequestId;
      const data = await postAproveFinalValuation(id);
      if (data !== null) {
        toast.success("Approved successfully");
        handleClose();
        onUpdate(true);
      } else {
        toast.error("Failed to approve");
      }
    } catch (error) {
      console.log("Error: ", error);
    }
    setIsLoading(false);
  };

  const handleReject = async (confirmValue) => {
    console.log("confirmValue", valuationRequestId);
    if (!confirmValue) return;
    setIsLoading(true);
    try {
      const data = await postCancelFinalValuation(valuationRequestId);
      if (data !== null) {
        toast.success("Rejected successfully");
        handleClose();
        onUpdate(true);
      } else {
        toast.error("Failed to reject");
      }
    } catch (error) {
      console.log("Error: ", error);
    }
    setIsLoading(false);
  };

  const handleShow = () => {
    const fetchValuationRequest = async () => {
      try {
        const data = await getProductDetailByRequestId(valuationRequestId);
        setProductInfo(data);
        data.productImages &&
          setUrlList(data.productImages.map((i) => i.imageUrl));
      } catch (error) {
        console.log("Error: ", error);
      }
    };
    fetchValuationRequest();
    setShow(true);
  };

  return (
    <>
      <ToastContainer />
      <button onClick={handleShow} className="btn btn-primary" type="button">
        Detail
      </button>
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Valuation request detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {productInfo && (
            <div className="productInfo">
              <h3>{productInfo.productName}</h3>
              <p>{productInfo.description}</p>
              <div className="d-flex justify-content-between">
                <p className="mb-1">Estimated Price:</p>
                <strong>
                  ${productInfo.estimatePriceMin} - $
                  {productInfo.estimatePriceMax}
                </strong>
              </div>
              <hr className="p-0 mb-1 mt-0" />
              <div className="d-flex justify-content-between">
                <p className="mb-1">Start price:</p>
                <strong>${productInfo.startPrice}</strong>
              </div>
              <hr className="p-0 mb-1 mt-0" />
              <div className="d-flex justify-content-between">
                <p className="mb-1">Buy now price:</p>
                <strong>${productInfo.buyNowPrice}</strong>
              </div>
              <hr className="p-0 mb-1 mt-0" />
              <div className="d-flex justify-content-between">
                <p className="mb-1">Maximum bid step:</p>
                <strong>{productInfo.maxStep}</strong>
              </div>
              <hr className="p-0 mb-1 mt-0" />
              <div className="d-flex justify-content-between">
                <p className="mb-1">Amount for each bid step:</p>
                <strong>${productInfo.pricePerStep}</strong>
              </div>
              <hr className="p-0 mb-1 mt-0" />
              <div className="d-flex justify-content-between">
                <p className="mb-1">Current status:</p>
                <strong>{productInfo.status}</strong>
              </div>
              <hr className="p-0 mb-1 mt-0" />
              <div className="productImages">
                <div className="productImages">
                  {productInfo.productImages &&
                    Array.isArray(productInfo.productImages) && (
                      <FullScreenImage imageUrls={urlList} />
                    )}
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          {isLoading ? (
            <Spinner animation="border" role="status" />
          ) : (
            <>
              <Confirm
                message="Are you sure you want to approve this valuation request?"
                mainLabel="Approve"
                className="success"
                labelYes="Yes"
                labelNo="No"
                onConfirm={handleApprove}
              />
              <Confirm
                message="Are you sure you want to reject this valuation request?"
                mainLabel="Reject"
                className="danger"
                labelYes="Yes"
                labelNo="No"
                onConfirm={handleReject}
              />
            </>
          )}
        </Modal.Footer>
      </Modal>

      <Modal show={!!selectedImageUrl} onHide={handleImageClose}>
        <Modal.Header closeButton>
          <Modal.Title>Product Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={selectedImageUrl}
            alt="Selected Product"
            style={{ width: "100%" }}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}

function ManagerApproved({ valuationRequestId, onUpdate }) {
  const [productInfo, setProductInfo] = useState({});
  const [show, setShow] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const [urlList, setUrlList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => setShow(false);
  const handleImageClick = (imageUrl) => {
    setSelectedImageUrl(imageUrl);
  };
  const handleImageClose = () => {
    setSelectedImageUrl(null);
  };

  const handleShow = () => {
    const fetchValuationRequest = async () => {
      try {
        const data = await getProductDetailByRequestId(valuationRequestId);
        setProductInfo(data);
        data.productImages &&
          setUrlList(data.productImages.map((i) => i.imageUrl));
      } catch (error) {
        console.log("Error: ", error);
      }
    };
    fetchValuationRequest();
    setShow(true);
  };

  const handleSendToMember = async (confirmValue) => {
    if (!confirmValue) return;
    setIsLoading(true);
    try {
      const id = valuationRequestId;
      const data = await postSendFinalValuationToMember(id);
      if (data !== null) {
        toast.success("Sent successfully");
        handleClose();
        onUpdate(true);
      } else {
        toast.error("Failed to send");
      }
    } catch (error) {
      console.log("Error: ", error);
    }
    setIsLoading(false);
  };

  return (
    <>
      <ToastContainer />
      <button onClick={handleShow} className="btn btn-primary" type="button">
        Detail
      </button>
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Valuation request detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {productInfo && (
            <div className="productInfo">
              <h3>{productInfo.productName}</h3>
              <p>{productInfo.description}</p>
              <div className="d-flex justify-content-between">
                <p className="mb-1">Estimated Price:</p>
                <strong>
                  ${productInfo.estimatePriceMin} - $
                  {productInfo.estimatePriceMax}
                </strong>
              </div>
              <hr className="p-0 mb-1 mt-0" />
              <div className="d-flex justify-content-between">
                <p className="mb-1">Start price:</p>
                <strong>${productInfo.startPrice}</strong>
              </div>
              <hr className="p-0 mb-1 mt-0" />
              <div className="d-flex justify-content-between">
                <p className="mb-1">Buy now price:</p>
                <strong>${productInfo.buyNowPrice}</strong>
              </div>
              <hr className="p-0 mb-1 mt-0" />
              <div className="d-flex justify-content-between">
                <p className="mb-1">Maximum bid step:</p>
                <strong>{productInfo.maxStep}</strong>
              </div>
              <hr className="p-0 mb-1 mt-0" />
              <div className="d-flex justify-content-between">
                <p className="mb-1">Amount for each bid step:</p>
                <strong>${productInfo.pricePerStep}</strong>
              </div>
              <hr className="p-0 mb-1 mt-0" />
              <div className="d-flex justify-content-between">
                <p className="mb-1">Current status:</p>
                <strong>{productInfo.status}</strong>
              </div>
              <hr className="p-0 mb-1 mt-0" />
              <div className="productImages">
                <div className="productImages">
                  {productInfo.productImages &&
                    Array.isArray(productInfo.productImages) && (
                      <FullScreenImage imageUrls={urlList} />
                    )}
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          {isLoading ? (
            <Spinner animation="border" role="status" />
          ) : (
            <>
              <Confirm
                message="Are you sure you want to send this valuation request to member?"
                mainLabel="Send to member"
                className="success"
                labelYes="Yes"
                labelNo="No"
                onConfirm={handleSendToMember}
              />
            </>
          )}
        </Modal.Footer>
      </Modal>

      <Modal show={!!selectedImageUrl} onHide={handleImageClose}>
        <Modal.Header closeButton>
          <Modal.Title>Product Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={selectedImageUrl}
            alt="Selected Product"
            style={{ width: "100%" }}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}
