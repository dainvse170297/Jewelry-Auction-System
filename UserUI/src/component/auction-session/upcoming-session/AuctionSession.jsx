import React from "react";
import CountdownIcon from "@mui/icons-material/AccessAlarm";
import Countdown from "../../countdown/Countdown";
import { Link, useNavigate } from "react-router-dom";

const AuctionSession = ({ session, showImage, showDetailBtn }) => {
  return (
    <>
      {showImage && (
        <div className="col-sm-4 d-flex justify-content-center align-items-center">
          <div className="row">
            <img
              className="img-fluid"
              src={session.defaultImageURL}
              alt="..."
            />
          </div>
        </div>
      )}
      <div className="col-sm-8 ">
        <div className="row">
          <div className="col">
            <div className="row d-flex justify-content-center text-center">
              <h3 className="py-3">{session.name}</h3>
            </div>
            <div className="row d-flex justify-content-center text-center mb-2">
              <div className="col-sm-6">
                <div className="countdown-label row p-2 border border-3 rounded-5">
                  <div className="col-sm-2 d-flex justify-content-center align-items-center">
                    <CountdownIcon style={{ width: "80%", height: "80%" }} />
                  </div>
                  <div className="col-sm-9">
                    <Countdown targetDate={session.startTime} />
                  </div>
                </div>
              </div>
            </div>
            <div className="row d-flex justify-content-center text-center py-2">
              <h5>{session.description}</h5>
            </div>
            <div className="row d-flex justify-content-center text-center">
              <h4 className="">
                Time:
                <strong>
                  {" "}
                  {new Date(session.startTime).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </strong>{" "}
                -{" "}
                <strong>
                  {new Date(session.endTime).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </strong>
              </h4>
            </div>
          </div>
        </div>
        {showDetailBtn && (
          <div className="row">
            <div className="col-sm-4">
              <Link to={`/upcoming-session-detail/${session.id}`}>
                <button type="button" className="detail-button">
                  View Detail
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AuctionSession;
