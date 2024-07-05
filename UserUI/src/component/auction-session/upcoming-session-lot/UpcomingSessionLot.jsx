import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React, { useEffect, useState } from "react";
import { Carousel, Form, InputGroup, Modal } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import {
  getCheckLotRegister,
  getUpcomingLotDetail,
  postPrePlaceBid,
} from "../../../services/apiService";
import "./upcoming-session-lot.scss";

const UpcomingSessionLot = () => {
  const { lotId } = useParams();

  const [lot, setLot] = useState({});
  const currentUser = JSON.parse(localStorage.getItem("account"));
  const [showModal, setShowModal] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [wasBid, setWasBid] = useState(null);
  const navigate = useNavigate();
  const [isPreBid, setIsPreBid] = useState(false);
  const [price, setPrice] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);

  let memberId = currentUser ? currentUser.memberId : 0;

  useEffect(() => {
    const getProductFromLot = async () => {
      try {
        const data = await getUpcomingLotDetail(lotId);
        setLot(data);
      } catch (error) {
        console.log(error);
      }
    };

    getProductFromLot();
  }, [lotId]);

  useEffect(() => {
    const checkRegister = async () => {
      try {
        const data = await getCheckLotRegister(memberId, lotId);
        if (data?.status === "REGISTERED") {
          setWasBid(data.previousPrice);
          setIsRegister(true);
        } else {
          setIsRegister(false);
        }
        console.log(wasBid);
      } catch (error) {
        console.log(error);
      }
    };
    checkRegister();
  }, [memberId, lotId]);

  const handleClose = () => {
    setShowModal(false);
    setIsPreBid(false);
  };

  const handleShow = () => {
    if (currentUser === null) {
      alert("Please login before register to bid");
      navigate("/login", { state: { from: `/upcoming-session-lot/${lotId}` } });
    } else {
      setShowModal(true);
    }
  };

  const handlePreBid = () => {
    setIsPreBid(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await postPrePlaceBid(
        currentUser.memberId,
        lotId,
        price
      );
      toast.success("Register to bid successfully");
      setTimeout(() => {
        window.location.reload();
      }, 2000);

      setIsRegister(true);
    } catch (error) {
      if (error.response) {
        setErrorMsg(error.response.data.message);
      } else if (error.request) {
        setErrorMsg("");
      } else {
        setErrorMsg("Something went wrong");
      }
    }
    console.log(errorMsg);
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="container">
      <div className="">
        <button onClick={goBack} className="btn">
          <ArrowBackIcon /> BACK TO AUCTION
        </button>
      </div>
      <hr />
      <div className="row">
        <div className="col-md-5">
          <Carousel>
            {lot.product?.productImages &&
              lot.product?.productImages.map(
                (image, index) => (
                  <Carousel.Item key={index}>
                    <img
                      className="d-block w-100 h-50"
                      src={image.imageUrl}
                      alt={image.defaultImage}
                    />
                    <Carousel.Caption></Carousel.Caption>
                  </Carousel.Item>
                ),
                []
              )}
          </Carousel>
        </div>
        <div className="ms-3 col-md-6">
          <h4>{lot.product?.name}</h4>
          <p>{lot.product?.description}</p>
          <p className="secondary">
            Estimate Price: ${lot.product?.estimatePriceMin} - $
            {lot.product?.estimatePriceMax}
          </p>
          <p className="secondary">Current Start Price: ${lot.currentPrice}</p>
          <p className="secondary">
            Category: {lot.product?.category?.name.toUpperCase()}
          </p>
          {/* <h5>{lot.status}</h5> */}

          {!isRegister ? (
            <div className="mt-3">
              <button className="register-to-bid-btn" onClick={handleShow}>
                Register To Bid
              </button>
            </div>
          ) : (
            <div className="mt-3">
              {(wasBid === 0 || wasBid) && (
                <p className>
                  You have placed a bid:
                  <strong style={{ color: "red" }}> ${wasBid}</strong>
                </p>
              )}
              <button className="registered-btn">REGISTERED</button>
            </div>
          )}

          <Modal show={showModal} onHide={handleClose} centered>
            <Modal.Header closeButton>
              <Modal.Title>Register to Bid</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h5>Would you like to set a price in advance?</h5>
              <p className="secondary">More than information</p>
            </Modal.Body>
            {isPreBid ? (
              <>
                <InputGroup className="mb-3 custom-input-group" size="sm">
                  <Form.Control
                    placeholder="Enter price...."
                    aria-label=""
                    aria-describedby="basic-addon2"
                    type="number"
                    value={price}
                    name="price"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                  <button className="custom-btn" onClick={handleSubmit}>
                    Submit
                  </button>
                </InputGroup>
                <div className="ms-3">
                  {errorMsg && <p className="text-danger">{errorMsg}</p>}
                </div>
              </>
            ) : (
              <>
                <div className="ms-3">
                  {errorMsg && <p className="text-danger">{errorMsg}</p>}
                </div>
              </>
            )}
            <Modal.Footer>
              <button className="register-to-bid-no-btn" onClick={handleSubmit}>
                Register without place bid
              </button>
              <button
                className="register-to-bid-yes-btn"
                onClick={handlePreBid}
              >
                Place a bid
              </button>
            </Modal.Footer>
          </Modal>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default UpcomingSessionLot;
