import axios from "axios";
import React, { useEffect, useState } from "react";
import "./upcoming-session.scss";
import { Spinner } from "react-bootstrap";
import AuctionSession from "./AuctionSession";

const UpcomingSessionList = () => {
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getAll = async () => {
      await axios
        .get("http://localhost:8080/auction/session/upcoming")
        .then((response) => {
          setUpcomingSessions(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getAll();
  }, []);

  return (
    <div className="container-fluid upcoming-session">
      <div className="row">
        <h1 className="text-center py-3">Upcoming Session</h1>
      </div>
      <div className="row d-flex justify-content-center">
        <div className="col-sm-8 mb-5">
          <hr />
        </div>
      </div>
      <div className="row d-flex justify-content-center">
        <div className="col-10">
          {loading ? (
            <Spinner animation="border" role="status">
              {/* <span className="sr-only">Loading...</span> */}
            </Spinner>
          ) : (
            upcomingSessions.map((session, index) => (
              <div className="row session-cart">
                <AuctionSession
                  session={session}
                  showImage={true}
                  showDetailBtn={true}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default UpcomingSessionList;
