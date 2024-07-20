import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { LinearProgress } from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Button, Carousel, Modal } from "react-bootstrap";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import {
  getBidHistory,
  getCheckLotRegister,
  getLiveLotDetail,
  getProfileDetail,
  postPlaceBidding,
} from "../../../services/apiService";
import Countdown from "../../countdown/Countdown";
import WebSocketHandler from "../../web-socket-handler/WebSocketHandler";
import "./LiveLotDetail.scss";
import ImageGallery from "../../../views/image/ImageGallery";
import SoldLot from "./SoldLot";

export default function LiveLotDetail() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [highlightStyle, setHighlightStyle] = useState({});
  const [errorMsg, setErrorMsg] = useState("");
  const [productInfo, setProductInfo] = useState({});
  const [bidHistory, setBidHistory] = useState([]);
  const [amountBid, setAmountBid] = useState(null);

  const currentUser = JSON.parse(localStorage.getItem("account"));

  const [isLoading, setIsLoading] = useState(false);

  const [multiplier, setMultiplier] = useState(1);
  const [message, setMessage] = useState(null);

  const [isSold, setIsSold] = useState(false);
  const [winningMessage, setWinningMessage] = useState("");

  const [financialProofAmount, setFinancialProofAmount] = useState(0);

  const [lastestBid, setLastestBid] = useState(0);

  useEffect(() => {
    const getInfo = async () => {
      setIsLoading(true);
      try {
        const response = await getLiveLotDetail(id);
        setProductInfo(response);
        if (response.status === "SOLD") {
          setIsSold(true);

        }
        setIsLoading(false);
      } catch (error) {
        console.log("Error:", error.message);
        setErrorMsg("Error fetching data from server");
      }
    };
    getInfo();
  }, [id]);

  useEffect(() => {
    const getLastestBid = async () => {
      try {
        const response = await getCheckLotRegister(currentUser.memberId, id);
        //console.log("Lastest Bid:", response.currentPrice);
        setLastestBid(response.currentPrice);
      } catch (error) {
        console.log("Error:", error);
      }
    }
    getLastestBid();
  }, [])

  useEffect(() => {
    const getMember = async () => {
      try {
        const response = await getProfileDetail(currentUser.memberId);
        setFinancialProofAmount(response.financialProofAmount);
      } catch (error) {
        console.log("Error:", error.message);
      }
    };
    getMember();
  }, [currentUser.memberId]);

  useEffect(() => {
    const fetchBidHistory = async () => {
      try {
        const response = await getBidHistory(id);
        setBidHistory(response);
      } catch (error) {
        console.log("Error:", error.message);
        setErrorMsg("Error fetching data from server");
      }
    };
    fetchBidHistory();
  }, [id]);

  const handleMultiplierChange = (e) => {
    setMultiplier(e.target.value);
  };

  useEffect(() => {
    if (message) {
      setProductInfo((prevInfo) => ({
        ...prevInfo,
        currentPrice: message.price,
      }));
    }
  }, [message]);

  const handleWinningMessage = (winningMessage) => {
    setWinningMessage(winningMessage);
  };

  const placeBid = async (calculatedAmount) => {
    setAmountBid(calculatedAmount);
    if (currentUser === null) {
      navigate("/login", { state: { from: `/live-lot-detail/${id}` } });
    } else {
      if ((calculatedAmount - lastestBid) > financialProofAmount) {
        toast.error("You do not have enough money to place this bid");
        return;
      } else {
        try {
          const placeBid = await postPlaceBidding(
            calculatedAmount,
            productInfo.id,
            currentUser.memberId
          );
          if (placeBid) {
            toast.success(`Successfully placed bid at $${calculatedAmount > productInfo.buyNowPrice ? productInfo.buyNowPrice : calculatedAmount}`, {
              autoClose: 2500,
            });
            setProductInfo((prevInfo) => ({
              ...prevInfo,
              currentPrice:
                calculatedAmount > prevInfo.buyNowPrice
                  ? prevInfo.buyNowPrice
                  : calculatedAmount,
            }));

            if (calculatedAmount === parseFloat(productInfo.buyNowPrice)) {
              handleWinningMessage("Congratulations! You have won the auction");
              setIsSold(true);
              setTimeout(() => {
                window.location.reload();
              }, 3000);
            }
          } else {
            toast.error("Failed to place bid.");
          }
        } catch (error) {
          toast.error("Failed to place bid...");
        }
      }
    }
  };

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const calculateBid = () => {
    let price;
    if (productInfo.currentPrice === 0) {
      price = parseFloat(productInfo.startPrice);
    } else {
      price = parseFloat(productInfo.currentPrice);
    }
    let calculatedAmount =
      price + parseFloat(productInfo.pricePerStep) * multiplier;

    placeBid(calculatedAmount);
  };

  const handleBuyNow = () => {
    let buyNowPrice = parseFloat(productInfo.buyNowPrice);
    placeBid(buyNowPrice);
    setShowModal(false);
  };

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (productInfo.currentPrice !== 0) {
      setHighlightStyle({
        color: "white",
        backgroundColor: "red",
        fontWeight: "bold",
        transition: "background-color 0.5s ease",
      });

      const timer = setTimeout(() => {
        setHighlightStyle({});
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [productInfo.currentPrice]);

  const maskName = (name) => {
    const [firstName] = name.split(" ");
    const maskedPart = '*'.repeat(7);
    return `${firstName} ${maskedPart}`;
  }

  return (
    <div className="container">
      {isSold ? (
        <>
          <SoldLot productInfo={productInfo} bidHistory={bidHistory} goBack={goBack} winningMessage={winningMessage} />
        </>
      ) : (
        <>
          <div className="">
            <a onClick={goBack} className="a">
              <ArrowBackIcon /> BACK TO AUCTION
            </a>
          </div>
          <hr />
          <h3>Live Auction</h3>
          {isLoading ? (
            <LinearProgress />
          ) : (
            <>
              <div className="row mt-5">
                <div className="col-lg-6">
                  {productInfo.productImages && (
                    <ImageGallery
                      images={productInfo.productImages.map(
                        (item, index) => item.imageUrl
                      )}
                    />
                  )}
                </div>
                <div className="col-lg-6">
                  <div className="clock">
                    <div className="mx-auto">
                      <Countdown targetDate={productInfo.endTime} />
                    </div>
                  </div>
                  <hr />
                  <div className="item-infor mt-2">
                    <h4>
                      <strong>{productInfo.productName}</strong>
                    </h4>
                    <div className="d-flex justify-content-center">
                      <div className="d-flex align-items-center">
                        {productInfo.currentPrice !== 0 ? (
                          <h4
                            className="p-3 border rounded-2"
                            style={highlightStyle}
                          >
                            <strong>
                              CURRENT PRICE : ${productInfo.currentPrice}
                            </strong>
                          </h4>
                        ) : (
                          <h4 className="me-3">
                            START PRICE : ${productInfo.startPrice}
                          </h4>
                        )}
                        <WebSocketHandler
                          lotId={id}
                          setMessage={setMessage}
                          setBidHistory={setBidHistory}
                          setFinancialProofAmount={setFinancialProofAmount}
                        />
                      </div>
                    </div>
                    <div className="d-flex justify-content-center mt-2">
                      <div className="d-flex align-items-center">
                        <h6 className="buy_now_price">
                          SALE FOR : ${" "}
                          {productInfo.buyNowPrice === null
                            ? 0
                            : productInfo.buyNowPrice}
                        </h6>
                      </div>
                    </div>
                    <div className="row">
                      {bidHistory.length > 0 && (
                        <div className="col mt-3">
                          <div className="bid-history">
                            <h5 className="text-center">Bid History</h5>
                            <hr />
                            {bidHistory.slice(0, 6).map((item, index) => (
                              <div key={index} className="">
                                <p className="mb-1 pb-1">
                                  {maskName(item.memberName)} -
                                  ${item.price}{" "}
                                  <span>
                                    {moment(item.bidTime).format(
                                      "YYYY-MM-DD HH:mm"
                                    )}
                                  </span>
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="d-flex justify-content-center mt-2">
                      <div className="d-flex align-items-center">
                        <h4 className="me-3 text-success">{winningMessage}</h4>
                      </div>
                    </div>
                    <div className="mt-5 mb-5">
                      <div className="bid-panel py-3">
                        <h4 className="text-center">
                          <strong>Bidding Panel</strong>
                        </h4>
                        <div className="d-flex ps-2 my-2">
                          <div className="col-sm-7 px-2">
                            <div className="d-flex bid-choose ">
                              <div className="w-100 ps-2 d-flex justify-content-between align-items-center">
                                <p className="p-0 m-0">Price per step:</p>
                                <p className="p-0 m-0">
                                  <strong style={{ color: "red" }}>
                                    ${productInfo.pricePerStep}
                                  </strong>
                                </p>
                                :
                              </div>
                              <div className="bid-input">
                                <input
                                  type="number"
                                  min={1}
                                  max={productInfo.maxStep}
                                  value={multiplier}
                                  onChange={handleMultiplierChange}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-5 px-2">
                            <div className="d-flex bid-choose ">
                              <div className="w-100 ps-2 d-flex justify-content-between align-items-center">
                                <p className="p-0 m-0">Total:</p>
                              </div>
                              <div className="bid-input">
                                <input
                                  type="text"
                                  value={
                                    productInfo?.currentPrice +
                                    productInfo?.pricePerStep * multiplier
                                  }
                                  readOnly
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex justify-content-center">
                          <button
                            className="buy-now-btn py-3 px-4"
                            onClick={handleShowModal}
                          >
                            <ShoppingBagIcon className="me-3" />
                            BUY NOW
                          </button>
                          <button
                            onClick={calculateBid}
                            className="bid-btn py-3 px-4"
                          >
                            PLACE BID
                          </button>
                        </div>
                        <ToastContainer />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-sm-9 px-0">
                  <div className="border rounded-2 py-2 pe-4 me-1 ps-3">
                    <h4>Product Details</h4>
                    <p className="mb-3">
                      <strong>{productInfo.productName}</strong>
                    </p>
                    <p className="mb-3">{productInfo.description}</p>
                    <p className="mb-3">
                      Start price : <strong>${productInfo.startPrice}</strong>{" "}
                    </p>
                    <p className="mb-3">
                      Estimate price:{" "}
                      <strong>
                        ${productInfo.estimatePriceMin} - $
                        {productInfo.estimatePriceMax}{" "}
                      </strong>{" "}
                    </p>
                  </div>
                </div>
                <div className="col-sm-3 h-100">
                  <div className="border rounded-2 py-2 ps-3 ms-1 h-100">
                    <h4>Useful for you</h4>
                    <ul>
                      <li>
                        <a href="/selling">How to sell my jewelry?</a>
                      </li>
                      <li>
                        <a href="/contact">Contact for support?</a>
                      </li>
                      <li>
                        <a href="/privacy-policy">Our policies</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </>
          )}
          <Modal show={showModal} onHide={handleCloseModal} centered>
            <Modal.Header closeButton>
              <Modal.Title>Buy Now?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Would you like to buy this jewelry with price $
              <strong> {productInfo.buyNowPrice}</strong>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
              <Button variant="danger" onClick={handleBuyNow}>
                Buy Now
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </div>
  );
}
