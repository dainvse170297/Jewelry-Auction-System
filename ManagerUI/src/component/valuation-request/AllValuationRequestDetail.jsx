import React, { useState, useEffect } from "react";
import { Modal, Button, Carousel } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { ToastContainer, toast } from "react-toastify";
import "./valuationRequest.scss";
import moment from "moment";

import {
  postPreliminaryConfirm,
  postProductReceive,
  postAproveFinalValuation,
  getFinalValuationDetail,
  postSendFinalValuationToMember,
  getValuationRequestById,
  getRejectValuationRequest,
} from "../../services/apiService.jsx";
import FullScreenImage from "../../view/image/FullScreenImage.jsx";
import Confirm from "../../view/confirm/Confirm.jsx";

export {
  ValuationRequested,
  PreliminaryValuated,
  PendingApproval,
  ManagerApproved,
};

function ValuationRequested({ valuationRequest }) {
  const [preliminaryValuation, setPreliminaryValuation] = useState({
    id: "",
    estimateMin: "",
    estimateMax: "",
  });

  const [show, setShow] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const [urlList, setUrlList] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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
    if (preliminaryValuation.estimateMin >= preliminaryValuation.estimateMax) {
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

  const [preliminaryValuation, setPreliminaryValuation] = useState({
    id: "",
    estimateMin: "",
    estimateMax: "",
  });

  const [show, setShow] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const [urlList, setUrlList] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleImageClick = (imageUrl) => {
    setSelectedImageUrl(imageUrl);
  };

  const handleImageClose = () => {
    setSelectedImageUrl(null);
  };

  const handleConfirm = async (e) => {
    try {
      const data = await postProductReceive(valuationRequestId);

      if (data.valuationStatus === "PRODUCT_RECEIVED") {
        toast.success("Confirm product received successfully");
      } else {
        console.log("Failed");
      }
    } catch (error) {
      console.log("Error:", error.message);
      toast.error("Error when confirm product received");
    }
  };

  useEffect(() => {
    try {
      const getData = async () => {
        const data = await getValuationRequestById(valuationRequestId);
        setValuationRequest(data);
        data.valuationImages &&
          setUrlList(data.valuationImages.map((image) => image.imageUrl));
      };
      getData();
    } catch (error) {
      console.log("Error: ", error);
    }
  }, [valuationRequestId]);

  const handleReject = async (confirmValue) => {
    if (confirmValue) {
      try {
        const data = await getRejectValuationRequest(valuationRequestId);
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
                <p className="mb-1">
                  <strong>Estimated Price:</strong>
                </p>
                ${valuationRequest.estimatePriceMin} - $
                {valuationRequest.estimatePriceMax}
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
            <Button className="btn-success mx-2">
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

function PendingApproval({ valuationRequestId, onUpdate }) {
  const [productInfo, setProductInfo] = useState({});
  const [show, setShow] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const [urlList, setUrlList] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleImageClick = (imageUrl) => {
    setSelectedImageUrl(imageUrl);
  };
  const handleImageClose = () => {
    setSelectedImageUrl(null);
  };

  useEffect(() => {
    try {
      const fetchProductInfo = async () => {
        const data = await getFinalValuationDetail(valuationRequestId);
        setProductInfo(data);
        data.productImages &&
          setUrlList(data.productImages.map((image) => image.imageUrl));
      };
      fetchProductInfo();
    } catch (error) {
      console.log("Error: ", error);
    }
  }, [valuationRequestId]);

  const handleApprove = async () => {
    try {
      const id = valuationRequestId;

      const data = await postAproveFinalValuation(id);

      if (data !== null) {
        toast.success("Approved successfully");
        handleClose();
        onUpdate(true);
        // navigate("/final-valuation-request-list");
      } else {
        toast.error("Failed to approve");
      }
    } catch (error) {
      console.log("Error: ", error);
    }
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
                <p className="mb-1">
                  <strong>Estimated Price:</strong>
                </p>
                ${productInfo.estimatePriceMin} - $
                {productInfo.estimatePriceMax}
              </div>
              <hr className="p-0 mb-1 mt-0" />
              <div className="d-flex justify-content-between">
                <p className="mb-1">
                  <strong>Start price:</strong>
                </p>
                ${productInfo.startPrice}
              </div>
              <hr className="p-0 mb-1 mt-0" />
              <div className="d-flex justify-content-between">
                <p className="mb-1">
                  <strong>Buy now price:</strong>
                </p>
                ${productInfo.buyNowPrice}
              </div>
              <hr className="p-0 mb-1 mt-0" />
              <div className="d-flex justify-content-between">
                <p className="mb-1">
                  <strong>Maximum bid step:</strong>
                </p>
                {productInfo.maxStep}
              </div>
              <hr className="p-0 mb-1 mt-0" />
              <div className="d-flex justify-content-between">
                <p className="mb-1">
                  <strong>Amount for each bid step:</strong>
                </p>
                ${productInfo.pricePerStep}
              </div>

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
          <Button variant="success" onClick={handleApprove}>
            Approve
          </Button>
          <Button variant="danger" onClick={handleClose}>
            Reject
          </Button>
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

function ManagerApproved({ valuationRequest, staffId, onHide }) {
  const handleSend = async (e) => {
    try {
      const data = await postSendFinalValuationToMember(
        valuationRequest.id,
        staffId
      );
      if (data !== null) {
        toast.success("Send to member successfully");
        onHide(true);
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
                    <Button className="btn-success" onClick={handleSend}>
                      Send to Member
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="row">
          <div className="col p-4">
            {valuationRequest && valuationRequest.valuationImagesUrls && (
              <FullScreenImage
                imageUrls={valuationRequest.valuationImagesUrls}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
