import React, { useEffect, useState } from "react";
import "./LiveLotDetail.scss";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Carousel } from "react-bootstrap";

export default function LiveLotDetail() {
  const { id } = useParams();
  // lấy giá trị đấu giá lớn nhất
  const [maxBid, setMaxBid] = useState();
  // giá trị bid của user
  const [bid, setBid] = useState();
  // tạo message cho error
  const [errorMsg, setErrorMsg] = useState("");
  // chứa thông tin của sản phẩm
  const [productInfo, setProductInfo] = useState();
  // danh sách lịch sử đấu giá
  const [bidHistory, setBidHistory] = useState([]);
  // số hàng bid hiển thị trong 1 ô lịch sửa đấu giá

  const [numberOfListHistory, setNumberOfListHistory] = useState(8);
  // chứa thời gian đếm ngược kết thúc live auction
  const [countDownTime, setCountDownTime] = useState();

  // reset bid
  const resetBid = () => {
    setBid(maxBid + 100);
  };

  // hàm tính giá trị bid
  const plusBid = (value) => {
    setBid(bid + value);
  };

  // lấy thông tin live lot đang đấu giá qua id lot
  useEffect(() => {
    const getInfo = async () => {
      try {
        axios.get(`/lot/view-live-lot-detail/${id}`).then((result) => {
          setProductInfo(result.data);
        });
      } catch (error) {
        console.log("Error:", error.message);
        setErrorMsg("Error fetching data from server");
      }
    };
    getInfo();
  }, []);

  // hàm gửi giá trị đặt cọc về server
  const sendBid = async () => {
    try {
      const response = await axios.post(`/bid/place-bid/${bid}`);

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
          <div className="countdown-time">
            <div className="time-part">
              Hour
              <h1>15</h1>
            </div>
            <h1>:</h1>
            <div className="time-part">
              Minute
              <h1>30</h1>
            </div>
            <h1>:</h1>
            <div className="time-part">
              Second
              <h1>29</h1>
            </div>
          </div>
          <div className="item-infor">
            <div className="item-name">{productInfo.productName}</div>
            <div className="item-description">
              This is description of product
            </div>
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
                value={`Budget: $` + `${bid}`}
                disabled
              />
            </div>

            <button onClick={() => sendBid()}>Place Bid</button>

            <button onClick={() => resetBid()}>Reset</button>
          </div>
        </div>

        <div className="show-bid">
          <div className="bid-row">
            <div className="show-money">$15</div>
            <div className="show-time">10:00:00</div>
          </div>
          <div className="bid-row">
            <div className="show-money">$15</div>
            <div className="show-time">10:00:00</div>
          </div>
          <div className="bid-row">
            <div className="show-money">$15</div>
            <div className="show-time">10:00:00</div>
          </div>
          <div className="bid-row">
            <div className="show-money">$15</div>
            <div className="show-time">10:00:00</div>
          </div>
          <div className="bid-row">
            <div className="show-money">$15</div>
            <div className="show-time">10:00:00</div>
          </div>
          <div className="bid-row">
            <div className="show-money">$15</div>
            <div className="show-time">10:00:00</div>
          </div>
          <div className="bid-row">
            <div className="show-money">$15</div>
            <div className="show-time">10:00:00</div>
          </div>
          <div className="bid-row">
            <div className="show-money">$15</div>
            <div className="show-time">10:00:00</div>
          </div>
        </div>
      </div>
    </div>
  );
}
