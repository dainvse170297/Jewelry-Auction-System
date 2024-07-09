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

  const [showPreBidModal, setShowPreBidModal] = useState(false);

  const preBidPrices = []

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

  for (let i = 0; i <= lot.maxStep; i++) {
    preBidPrices.push(lot.startPrice + lot.pricePerStep * i)
  }

  useEffect(() => {
    const checkRegister = async () => {
      try {
        const data = await getCheckLotRegister(memberId, lotId);
        //console.log(data);
        if (data.status === "REGISTERED") {
          setWasBid(data.previousPrice);
          setIsRegister(true);
        } else {
          setIsRegister(false);
        }
        // console.log(wasBid);

      } catch (error) {
        console.log(error);
      }
    };
    checkRegister();
  }, [memberId, lotId]);

  const handleCloseModal = () => {
    setShowModal(false);
    setIsPreBid(false);
  };

  const handleClosePreBidModal = () => {
    setShowPreBidModal(false);
    setIsPreBid(false);
  };

  const handleGoBack = () => {
    setShowPreBidModal(false);
    setShowModal(true);
  }

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
    setShowPreBidModal(true);
    setShowModal(false);
  };

  const handleSubmitWitoutPreBid = async (e) => {
    e.preventDefault();

    try {

      const response = await postPrePlaceBid(
        currentUser.memberId,
        lotId,
        price
      );
      if (!response.message) {
        setIsRegister(true);
        toast.success("Register to bid successfully");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
        console.log(response);
      } else {
        toast.error("Failed to register to bid");
        setErrorMsg(response.message);
      }


    } catch (error) {
      console.log(error.response);
    }
  };

  const handleSubmitWithinPreBid = async (e) => {
    e.preventDefault();

    try {
      if (price.trim() === "") {
        setErrorMsg("Please choose a price to bid");
        return;
      } else {
        const response = await postPrePlaceBid(
          currentUser.memberId,
          lotId,
          price
        );
        if (!response.message) {
          setIsRegister(true);
          toast.success("Register to bid successfully");
          setTimeout(() => {
            window.location.reload();
          }, 2000);
          console.log(response);
        } else {
          toast.error("Failed to register to bid");
          setErrorMsg(response.message);
        }
      }

    } catch (error) {
      console.log(error.response);
    }
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

          <Modal show={showModal} onHide={handleCloseModal} centered>
            <Modal.Header closeButton>
              <Modal.Title>Register to Bid</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h5>Would you like to set a price in advance?</h5>
            </Modal.Body>
            <Modal.Footer>
              <button className="register-to-bid-no-btn" onClick={handleSubmitWitoutPreBid}>
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


          <Modal show={showPreBidModal} onHide={handleClosePreBidModal} centered>
            <Modal.Header closeButton>
              <Modal.Title>Register to Bid</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h5>Would you like to set a price in advance?</h5>
            </Modal.Body>
            {isPreBid ? (
              <>
                <InputGroup className="mb-3 custom-input-group" size="sm">
                  <Form.Select
                    name="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  >
                    <option>--</option>
                    {preBidPrices.map((preBidPrice, index) => (
                      <option key={index} value={preBidPrice}>{preBidPrice}</option>
                    ))}
                  </Form.Select>
                  <button className="custom-btn" onClick={handleSubmitWithinPreBid}>
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
              <button className="register-to-bid-no-btn" onClick={handleGoBack}>
                Back
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
