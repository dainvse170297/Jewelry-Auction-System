import React, { memo, useEffect, useState } from "react";
import { getAllAuctionSession } from "../../services/apiService";
import moment from "moment";
import { Edit, Face } from "@mui/icons-material";
import { Button, Modal } from "react-bootstrap";
import CreateAuction from "../manager/CreateAuction";

const AuctionSessionList = () => {
  // Your component logic here
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  const handleShowEdit = (id) => {
    console.log("edit ", id);
    handleShow();
  }

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
                <th>Action</th>
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
                  <td>
                    <button className="btn btn-warning" onClick={() => handleShowEdit(session.id)}>
                      <Edit />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Modal show={show} onHide={handleClose} centered size="lg">
            <Modal.Header closeButton>
              <Modal.Title>Edit Auction Session</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <CreateAuction />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default AuctionSessionList;
