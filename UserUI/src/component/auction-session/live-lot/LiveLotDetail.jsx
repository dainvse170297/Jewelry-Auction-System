import React, { useEffect, useState } from "react";
import "./LiveLotDetail.scss";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Carousel } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Countdown from "../../countdown/Countdown";
// import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
// import "react-bootstrap-carousel/dist/react-bootstrap-carousel.js";

export default function LiveLotDetail() {
  // lấy id user
  const { userId } = useParams();
  // lấy id lot
  const { lotId } = useParams();
  // lấy giá trị đấu giá lớn nhất
  const [maxBid, setMaxBid] = useState();
  // giá trị place bid của user

  const [bid, setBid] = useState();
  const [errorMsg, setErrorMsg] = useState("");
  // chứa thông tin của sản phẩm
  const [productInfo, setProductInfo] = useState({});
  // danh sách lịch sử đấu giá
  const [bidHistory, setBidHistory] = useState([]);
  // số hàng bid hiển thị trong ô lịch sửa đấu giá
  const [numberOfListHistory, setNumberOfListHistory] = useState(8);
  // chứa thời gian còn lại
  const [timeLeft, setTimeLeft] = useState();

  const sendBid = async () => {
    try {
      const formData = new FormData();
      formData.append("memberId", { userId });
      formData.append("lotId", { lotId });
      formData.append("price", bid);

      const response = await axios
        .post(`http://localhost:8080/bid/place-bid`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response.data.message);
          toast.success("Place Bid Successfully!");
        })
        .catch((error) => {
          console.log(error);
          console.log(error.response);
          toast.error("Place Bid Failed!");
        });

      if (response.status === 200) {
        // console.log("Success")
        toast.success("Approved successfully");
      } else {
        // console.log("Failed")
        toast.error("Failed to approve");
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  // lấy thông tin live lot đang đấu giá qua id lot
  useEffect(() => {
    const getInfo = async () => {
      try {
        axios
          .get(`http://localhost:8080/lot/view-live-lot-detail/${id}`)
          .then((result) => {
            setProductInfo(result.data);
          });
      } catch (error) {
        console.log("Error:", error.message);
        setErrorMsg("Error fetching data from server");
      }
    };
    getInfo();
  }, []);

  // lấy danh sách lịch sử đấu giá
  useEffect(() => {
    const getBidHistory = async () => {
      try {
        axios.get(`http://localhost:8080/bid/list-bid`).then((result) => {
          setBidHistory(result.data);
        });
      } catch (error) {
        console.log("Error:", error.message);
        setErrorMsg("Error fetching data from server");
      }
    };
    getBidHistory();
  }, []);

  // hàm cập nhật giá trị đấu giá lớn nhất
  useEffect(() => {
    if (bidHistory.length > 0) {
      setMaxBid(bidHistory[0].price);
      setBid(maxBid + 100);
    }
  }, [bidHistory]);

  // hàm chuyển đổi string thành đối tượng Date
  const convertStringToDate = (dateString) => {
    let dateObject = new Date(dateString);
    return dateObject;
  };

  // hàm tính thời gian còn lại
  // const calculateTimeLeft = () => {
  //   const difference = +new Date(targetDate) - +new Date();
  //   let timeLeft = {};

  //   if (difference > 0) {
  //     timeLeft = {
  //       days: Math.floor(difference / (1000 * 60 * 60 * 24)),
  //       hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
  //       minutes: Math.floor((difference / 1000 / 60) % 60),
  //       seconds: Math.floor((difference / 1000) % 60),
  //     };
  //   }

  //   return timeLeft;
  // };

  // // gán giá trị vào biến timeLeft
  // setTimeLeft(calculateTimeLeft());

  // // cập nhật thời gian còn lại
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setTimeLeft(calculateTimeLeft());
  //   }, 1000);

  //   return () => clearTimeout(timer);
  // });

  // reset bid
  const resetBid = () => {
    setBid(maxBid + 100);
  };

  // hàm tính giá trị bid
  const plusBid = (value) => {
    setBid(bid + value);
  };

  return (
    <div className="content-body">
      <div className="display">
        <div className="show-image">
          <Carousel>
            {productInfo.productImages &&
              productInfo.productImages.map((item, index) => (
                <Carousel.Item key={index}>
                  <img
                    // className="d-block w-100"
                    src={item.imageUrl}
                    alt={"photo"}
                    // style={{ height: '300px', width: '100%' }}
                  />
                </Carousel.Item>
              ))}
          </Carousel>
        </div>

        <div className="information">
          <Countdown targetDate={productInfo.endTime} />
          <div className="item-infor">
            <div className="item-name">{productInfo.productName}</div>
            <div className="item-description">{productInfo.description}</div>
          </div>
        </div>
      </div>

      <div className="display">
        <div className="show-infor">
          <div className="button-row">
            <button onClick={() => plusBid(100)}>$100</button>
            <button onClick={() => plusBid(200)}>$200</button>
            <button onClick={() => plusBid(500)}>$500</button>
          </div>
          <div className="button-row">
            <button onClick={() => plusBid(1000)}>$1.000</button>
            <button onClick={() => plusBid(2000)}>$2.000</button>
            <button onClick={() => plusBid(5000)}>$5.000</button>
          </div>
          <div className="button-row">
            <button onClick={() => plusBid(10000)}>$10.000</button>
            <button onClick={() => plusBid(20000)}>$20.000</button>
            <button onClick={() => plusBid(50000)}>$50.000</button>
          </div>
          <div className="button-row">
            <button onClick={() => plusBid(100000)}>$100.000</button>
            <button onClick={() => plusBid(200000)}>$200.000</button>
            <button onClick={() => plusBid(500000)}>$500.000</button>
          </div>
          <div className="my-bid">
            <div className="">
              <input
                type="text"
                name="bidValue"
                value={`$` + `${bid}`}
                disabled
              />
              <input
                type="text"
                name="bidValue"
                value={`Budget: $` + `NaN`}
                disabled
              />
            </div>

            <button onClick={() => sendBid()}>Place Bid</button>
            <button onClick={() => resetBid()}>Reset</button>
          </div>
        </div>

        <div className="show-bid">
          {bidHistory.slice(0, numberOfListHistory).map((item, index) => (
            <div className="bid-row" key={index}>
              <div className="show-money">${item.price}</div>
              <div className="show-time">
                {convertStringToDate(item.bidTime).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
