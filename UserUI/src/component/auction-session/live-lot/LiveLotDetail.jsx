import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { LinearProgress } from "@mui/material";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Countdown from "../../countdown/Countdown";
import "./LiveLotDetail.scss";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

export default function LiveLotDetail() {
  const location = useLocation();
  const navigate = useNavigate();

  const { id } = useParams();
  const [errorMsg, setErrorMsg] = useState("");
  const [productInfo, setProductInfo] = useState({});
  const [bidHistory, setBidHistory] = useState([]);
  const [amountBid, setAmountBid] = useState(null);

  const currentUser = JSON.parse(localStorage.getItem("account"));

  const [isLoading, setIsLoading] = useState(false);

  const [multiplier, setMultiplier] = useState(1);

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
  }, [id])

  const handleMultiplierChange = (e) => {
    setMultiplier(e.target.value);
  }

  const calculateBid = async () => {
    let price = parseFloat(productInfo.currentPrice);
    let calculatedAmount = price + parseFloat(productInfo.pricePerStep) * multiplier;

    setAmountBid(calculatedAmount);
    if (currentUser === null) {
      navigate("/login", { state: { from: `/live-lot-detail/${id}` } });
    } else {
      // console.log("calculatedAmount: ", calculatedAmount, "lotId: ", productInfo.id, "memberId: ", currentUser.memberId)
      const formData = new FormData();
      formData.append("price", calculatedAmount);
      formData.append("lotId", productInfo.id);
      formData.append("memberId", currentUser.memberId);

      const placeBid = await axios.post(
        "http://localhost:8080/bid/place-bid",
        formData
      );
      if (placeBid.status === 200) {
        toast.success(`Successfully placed bid at $${calculatedAmount}`);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        toast.error("Failed to place bid");
      }
    }

  };

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
                  {/* {console.log(productInfo.endTime)} */}
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
                    <h4 className="me-3">
                      Current Price: ${" "}
                      {productInfo.currentPrice === null
                        ? 0
                        : productInfo.currentPrice}
                    </h4>
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

                <div className="mt-5 mb-5">
                  <div className="">
                    <div className="bid-panel">
                      <h5 className="text-center">Bidding Panel</h5>
                      <div className="d-flex justify-content-center">
                        <button className="buy-now-btn">
                          <ShoppingBagIcon className="me-3" />
                          BUY NOW
                        </button>
                        <button onClick={calculateBid} className="bid-btn">
                          PLACE BID
                        </button>
                        <div className="ms-3">
                          <div className="bid-input">
                            <input type="number" min={1} max={productInfo.maxStep} defaultValue={1} value={multiplier} onChange={handleMultiplierChange} />
                          </div>
                        </div>
                      </div>

                      <ToastContainer />
                    </div>
                  </div>

                </div>
              </div>
            </div>

            <div className="col-lg-6 mt-3">

            </div>
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
    </div>
  );
}
