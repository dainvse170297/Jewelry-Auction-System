import React, { memo, useEffect, useState } from "react";
import { getAllAuctionSession } from "../../services/apiService";
import moment from "moment";

const AuctionSessionList = () => {
  // Your component logic here

  const [auctionSessions, setAuctionSessions] = useState([]);

  useEffect(() => {
    const getAllSession = async () => {
      try {
        const response = await getAllAuctionSession();
        setAuctionSessions(response);
      } catch (error) {
        console.log("error", error);
      }
    }
    getAllSession();
  }, [])

  return (
    <div className="container">
      <div className="text-center">
        <h2>Auction Session List</h2>
        <div className="">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Session Name</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {auctionSessions && auctionSessions.map((session, index) => (
                <tr key={index}>
                  <td>{session.id}</td>
                  <td>{session.name}</td>
                  <td>{moment(session.startTime).format("MM/DD/YYYY HH:mm:ss")}</td>
                  <td>{moment(session.endTime).format("MM/DD/YYYY HH:mm:ss")}</td>
                  <td>{session.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AuctionSessionList;
