import React, { useEffect, useState } from "react";
import axios from "axios";
import "./LiveAuctionSessionDetail.scss";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
const LiveAuctionSessionDetail = () => {
  const [sessionData, setSessionData] = useState(null);

  useEffect(() => {
    // Lấy dữ liệu từ API
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/auction/session/view-live-auction-session-detail",
          {
            params: {
              sessionId: 11, // Thay đổi ID phiên đấu giá theo yêu cầu
              memberId: 1, // Thay đổi ID thành viên theo yêu cầu
            },
          }
        );
        setSessionData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!sessionData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <h1 className="text-center py-3 red-title">Live Auction Session</h1>
        <p className="text-center">{sessionData.description}</p>

        <div className="row d-flex justify-content-center">
          <div className="col-sm-8 mb-5">
            <hr />
            <div className="d-flex justify-content-center">
              <div className="col-6 bor">
                Start Time: {sessionData.startTime}
              </div>
              <div className="col-6 bor">End Time: {sessionData.endTime}</div>
            </div>
            <hr />
          </div>
        </div>

        <div className="row lots-row">
          {sessionData.lots.map((lot) => (
            <div key={lot.id} className="lot-container">
              <div className="lot border p-3">
                <img
                  src={lot.productImages[0].imageUrl}
                  alt={lot.productName}
                  className="img-fluid mb-3"
                />
                <h5>{lot.productName}</h5>
                <p>Current Price: ${lot.currentPrice}</p>
                <Link to={`/live-lot-detail/${lot.id}`}>
                  <Button variant="primary">View Detail</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LiveAuctionSessionDetail;
