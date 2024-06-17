import React, { useEffect, useState } from "react";
import axios from "axios";
import "./LiveAuctionSessionDetail.scss";
import LotPreview from "../../lot/LotPreview";
import AuctionSession from "../AuctionSession";
import Paginator from "../../common/Paginator";
import { useParams } from "react-router-dom";

const LiveAuctionSessionDetail = () => {
  const { id } = useParams();
  const [sessionData, setSessionData] = useState(null);

  useEffect(() => {
    // Fetch data from API
    const fetchSessionData = async () => {
      try {
        const formData = new FormData();
        formData.append("sessionId", id);
        formData.append("memberId", 1);

        const response = await axios.post(
          `http://localhost:8080/auction/session/view-live-auction-session-detail`,
          formData
        );
        if (response.status === 200) {
          setSessionData(response.data);
        } else {
          console.log("Error");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchSessionData();
  }, [id]);

  if (!sessionData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <h1 className="text-center py-3 red-title mb-4">
          Live Auction Session
        </h1>

        <div className="mb-3">
          <div className="row d-flex justify-content-center mb-5">
            <AuctionSession
              session={sessionData}
              showImage={false}
              showDetailBtn={false}
            />
          </div>
        </div>
        <div className="row d-flex justify-content-center ">
          <div className="col-xxl-10 col-lg-10 col-11 ">
            <div className="row">
              {sessionData.lots.map((lot) => (
                <div className="col-xxl-3 col-lg-4 col-6 my-3 d-flex justify-content-center">
                  <div className="">
                    <LotPreview lot={lot} sessionStatus="LIVE" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveAuctionSessionDetail;
