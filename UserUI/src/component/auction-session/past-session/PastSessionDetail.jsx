import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { LinearProgress } from "@mui/material";
import LotPreview from "../../lot/LotPreview";
import AuctionSession from "../AuctionSession";
import { postPastSessionDetail } from "../../../services/apiService";

const PastSessionDetail = () => {
  const { id } = useParams();
  const [sessionData, setSessionData] = useState(null);

  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        const data = await postPastSessionDetail(id);
        if (data !== null) {
          setSessionData(data);
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
    return (
      <div>
        <LinearProgress />
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <h1 className="text-center py-3 red-title mb-4">
          Past Auction Session
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
        <div className="row d-flex justify-content-center">
          <div className="col-xxl-10 col-lg-10 col-11">
            <div className="row">
              {sessionData.lots.map((lot, index) => (
                <div
                  key={index}
                  className="col-xxl-3 col-lg-4 col-6 my-3 d-flex justify-content-center"
                >
                  <LotPreview lot={lot} sessionStatus="PAST" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PastSessionDetail;
