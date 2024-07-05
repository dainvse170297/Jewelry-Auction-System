import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { LinearProgress } from "@mui/material";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Button, Carousel, Modal } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Countdown from "../../countdown/Countdown";
import "./LiveLotDetail.scss";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import WebSocketHandler from "../../web-socket-handler/WebSocketHandler";

export default function LiveLotDetail() {
  const { id } = useParams();

  const location = useLocation();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

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

  useEffect(() => {
    const getInfo = async () => {
      setIsLoading(true);
      try {
        await axios
          .get(`http://localhost:8080/lot/view-live-lot-detail/${id}`)
          .then((result) => {
            setProductInfo(result.data);
          });
        setIsLoading(false);
      } catch (error) {
        console.log("Error:", error.message);
        setErrorMsg("Error fetching data from server");
      }
    };
    getInfo();
    console.log("location", location);
  }, [id]);

  //http://localhost:8080/bid/list-bid?lotId=68
  useEffect(() => {
    const getBidHistory = async () => {
      try {
        await axios
          .get(`http://localhost:8080/bid/list-bid?lotId=${id}`)
          .then((result) => {
            setBidHistory(result.data);
            // console.log(result.data);
          });
      } catch (error) {
        console.log("Error:", error.message);
        setErrorMsg("Error fetching data from server");
      }
    };
    getBidHistory();
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
    // toast(winningMessage, { autoClose: 2500 })
    setWinningMessage(winningMessage);
  }

  const placeBid = async (calculatedAmount) => {
    // let price = parseFloat(productInfo.currentPrice);
    // let calculatedAmount = price + parseFloat(productInfo.pricePerStep) * multiplier;

    setAmountBid(calculatedAmount);
    if (currentUser === null) {
      navigate("/login", { state: { from: `/live-lot-detail/${id}` } });
    } else {
      const formData = new FormData();
      formData.append("price", calculatedAmount);
      formData.append("lotId", productInfo.id);
      formData.append("memberId", currentUser.memberId);
      console.log(
        "formData",
        calculatedAmount,
        productInfo.id,
        currentUser.memberId
      );
      try {
        const placeBid = await axios.post(
          "http://localhost:8080/bid/place-bid",
          formData
        );
        if (placeBid.status === 200) {
          toast.success(`Successfully placed bid at $${calculatedAmount}`, {
            autoClose: 2500,
          });
          // Manually update the current price and bid history
          setProductInfo((prevInfo) => ({
            ...prevInfo,
            currentPrice:
              calculatedAmount > prevInfo.buyNowPrice
                ? prevInfo.buyNowPrice
                : calculatedAmount,
          }));
          // setBidHistory((prevHistory) => [
          //   { price: calculatedAmount, bidTime: new Date() },
          //   ...prevHistory,
          // ]);
        } else {
          toast.error("Failed to place bid");
        }
      } catch (error) {
        toast.error("Failed to place bid");
      }
    }
  };

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const calculateBid = () => {
    let price;
    if (productInfo.currentPrice === 0) {
      price = parseFloat(productInfo.startPrice);
      console.log("price", price);
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

  if (productInfo !== null && productInfo.status === "SOLD") {
    return (
      <div className="container">
        <div className="text-center">
          <h3>This item has been sold</h3>
          <a href="/" className="a">
            <ArrowBackIcon /> BACK TO HOME
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="">
        <a href="#" className="a">
          <ArrowBackIcon /> BACK TO AUCTION
        </a>
      </div>
      <hr />
      <h3>Live Auction</h3>
      {isLoading ? (
        <>
          <LinearProgress />
        </>
      ) : (
        <>
          <div className="row mt-5">
            <div className="col-lg-6">
              <div className="lot-img">
                <Carousel>
                  {productInfo.productImages &&
                    productInfo.productImages.map((item, index) => (
                      <Carousel.Item key={index}>
                        <img src={item.imageUrl} alt={"photo"} />
                      </Carousel.Item>
                    ))}
                </Carousel>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="clock">
                <div className="mx-auto">
                  <Countdown targetDate={productInfo.endTime} />
                </div>
              </div>

              <div className="item-infor mt-5">
                <h4 className="text-center">
                  <strong>{productInfo.productName}</strong>
                </h4>
                <div className="text-center text-secondary">
                  {productInfo.description}
                </div>


                <div className="d-flex justify-content-center mt-5">
                  <div className="d-flex align-items-center">
                    {productInfo.currentPrice !== 0 ? (
                      <h4 className="me-3">
                        CURRENT PRICE : ${productInfo.currentPrice}
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
                    />
                  </div>
                </div>

                <div className="d-flex justify-content-center mt-5">
                  <div className="d-flex align-items-center">
                    <h4 className="me-3 buy_now_price">
                      SALE FOR : ${" "}
                      {productInfo.buyNowPrice === null
                        ? 0
                        : productInfo.buyNowPrice}
                    </h4>
                  </div>
                </div>

                <div className="d-flex justify-content-center mt-5">
                  <div className="d-flex align-items-center">
                    <h4 className="me-3 text-success">
                      {winningMessage}
                    </h4>
                  </div>
                </div>

                <div className="mt-5 mb-5">
                  <div className="">
                    <div className="bid-panel">
                      <h5 className="text-center">Bidding Panel</h5>
                      <div className="d-flex justify-content-center">
                        <button
                          className="buy-now-btn"
                          onClick={handleShowModal}
                        >
                          <ShoppingBagIcon className="me-3" />
                          BUY NOW
                        </button>
                        <button onClick={calculateBid} className="bid-btn">
                          PLACE BID
                        </button>

                        <div className="ms-3">
                          <div className="text-center text-secondary">
                            Price per step: ${productInfo.pricePerStep}
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

                      <ToastContainer />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6 mt-3"></div>
            {bidHistory.length > 0 && (
              <div className="col-lg-6 mt-3">
                <div className="bid-history">
                  <h5 className="text-center">Bid History</h5>
                  <hr />
                  {bidHistory.map((item, index) => (
                    <div key={index} className="">
                      <p>
                        ${item.price}{" "}
                        <span>
                          {moment(item.bidTime).format("YYYY-MM-DD HH:mm")}
                        </span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
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
          <Button variant="primary" onClick={handleBuyNow}>
            Buy Now
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
