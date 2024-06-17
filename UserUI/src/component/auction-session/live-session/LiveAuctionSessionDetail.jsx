import React, { useEffect, useState } from "react";
import axios from "axios";
import "./LiveAuctionSessionDetail.scss";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Countdown from "../../countdown/Countdown";
import CountdownIcon from "@mui/icons-material/AccessAlarm";
import LotPreview from "../upcoming-session/LotPreview";

const LiveAuctionSessionDetail = () => {
  const [sessionData, setSessionData] = useState(null);
  const [bidData, setBidData] = useState([]);
  useEffect(() => {
    // Fetch data from API
    const fetchSessionData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/auction/session/view-live-auction-session-detail",
          {
            params: {
              sessionId: 11, // Change the session ID as required
              memberId: 1, // Change the member ID as required
            },
          }
        );
        setSessionData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchBidData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/bid/list-bid");
        setBidData(response.data);
      } catch (error) {
        console.error("Error fetching bid data:", error);
      }
    };

    fetchSessionData();
    fetchBidData();
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
                <div>Start Time: {sessionData.startTime}</div>
                <div>End Time: {sessionData.endTime}</div>
              </div>
              <div className="col-6 bor">aaaaa aaaaaaa bbbbb cccc</div>
            </div>
            <hr />
          </div>
        </div>

        <div className="row lots-row">
          {sessionData.lots.map((lot) => (
            <div key={lot.id} className="lot-container">
              <div className="lot border p-3">
                <div className="image-container">
                  <img
                    src={lot.productImages[0].imageUrl}
                    alt={lot.productName}
                    className="img-fluid mb-3"
                  />
                  <div className="participants-circle">
                    {lot.numberOfRegister}
                  </div>
                </div>
                <h5>{lot.productName}</h5>
                <p>Current Price: ${lot.currentPrice}</p>
                <p>
                  Est. ${lot.estimatedPriceMin} - ${lot.estimatedPriceMax}{" "}
                </p>
                <Link to={`/live-lot-detail/${lot.id}`}>
                  <Button variant="primary">Place Bid</Button>
                </Link>
              </div>
              {/* <LotPreview lot={lot} /> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LiveAuctionSessionDetail;
