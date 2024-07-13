import { Edit, Visibility } from "@mui/icons-material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { getAllAuctionSession } from "../../services/apiService";
import Paginator from "../common/Paginator";
import EditAuctionSession from "./EditAuctionSession";
import AuctionSessionDetail from "./AuctionSessionDetail";

const AuctionSessionList = () => {
  // Your component logic here
  const [show, setShow] = useState(false);

  const [showDetail, setShowDetail] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseDetail = () => setShowDetail(false);

  const handleShowSessionDetail = () => setShowDetail(true);

  const [auctionSessions, setAuctionSessions] = useState([]);

  const [auctionSessionId, setAuctionSessionId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = auctionSessions.slice(indexOfFirstItem, indexOfLastItem)

  const calculateTotalPage = (itemsPerPage, items) => {
    const totalItem = items.length;
    return Math.ceil(totalItem / itemsPerPage);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
    setAuctionSessionId(id);
    handleShow();
  }

  const handleShowDetail = (id) => {
    setAuctionSessionId(id);
    handleShowSessionDetail();
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
                <th colSpan={2}>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems && currentItems.map((session, index) => (
                <tr key={index}>
                  <td>{session.id}</td>
                  <td>{session.name}</td>
                  <td>{moment(session.startTime).format("MM/DD/YYYY HH:mm:ss")}</td>
                  <td>{moment(session.endTime).format("MM/DD/YYYY HH:mm:ss")}</td>
                  <td>{session.status}</td>
                  <td>
                    {session.status === "PAST" ? (
                      <>
                      </>
                    ) : (
                      <button className="btn btn-warning" onClick={() => handleShowEdit(session.id)}>
                        <Edit />
                      </button>
                    )}

                  </td>
                  <td>
                    <button className="btn btn-success" onClick={() => handleShowDetail(session.id)}>
                      <Visibility />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex align-items-center justify-content-center">
            <Paginator
              currentPage={currentPage}
              totalPages={calculateTotalPage(itemsPerPage, auctionSessions)}
              onPageChange={handlePageChange}
            />
          </div>

          <Modal show={show} onHide={handleClose} centered size="lg" scrollable>
            <Modal.Header closeButton>
              <Modal.Title>Edit Auction Session</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <EditAuctionSession auctionSessionId={auctionSessionId} />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal show={showDetail} onHide={handleCloseDetail} centered size="lg" scrollable>
            <Modal.Header closeButton>
              <Modal.Title>Auction Session</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <AuctionSessionDetail auctionSessionId={auctionSessionId} />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseDetail}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default AuctionSessionList;
