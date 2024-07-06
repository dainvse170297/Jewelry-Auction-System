import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import AuctionSession from "../AuctionSession";
import { getPastSessionList } from "../../../services/apiService";

const PastSessionList = () => {
  const [liveSessions, setLiveSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAll = async () => {
      try {
        const data = await getPastSessionList();
        console.log(data);
        if (Array.isArray(data)) {
          setLiveSessions(data);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    getAll();
  }, []);

  return (
    <div className="container-fluid upcoming-session">
      <div className="row">
        <h1 className="text-center py-3">Past Auction Session</h1>
      </div>
      <div className="row d-flex justify-content-center">
        <div className="col-sm-8 mb-5">
          <hr />
        </div>
      </div>
      <div className="row d-flex justify-content-center">
        <div className="col-10">
          {loading ? (
            <Spinner animation="border" role="status"></Spinner>
          ) : (
            <>
              {liveSessions.length === 0 && (
                <div className="text-center">
                  <h3>No past session available</h3>
                </div>
              )}

              {liveSessions.map((session, index) => (
                <div className="row session-cart" key={index}>
                  <AuctionSession
                    session={session}
                    showImage={true}
                    showDetailBtn={true}
                  />
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PastSessionList;
