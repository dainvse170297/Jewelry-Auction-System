import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import AuctionSession from "../AuctionSession";
import { getLiveAuctionSessionList } from "../../../services/apiService";
const LiveSessionList = () => {
  const [liveSessions, setLiveSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    try {
      const getAll = async () => {
        const data = await getLiveAuctionSessionList();
        if (Array.isArray(data)) {
          setLiveSessions(data);
        }
        setLoading(false);
      };
      getAll();
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  }, []);

  return (
    <div className="container-fluid upcoming-session">
      <div className="row">
        <h1 className="text-center py-3">Live Session</h1>
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
            liveSessions.map((session, index) => (
              <div className="row session-cart" key={index}>
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

export default LiveSessionList;
