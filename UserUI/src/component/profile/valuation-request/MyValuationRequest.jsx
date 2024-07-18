import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { getSentValuationRequest } from "../../../services/apiService";
import Paginator from "../../common/Paginator";
import ValuationResponseList from "../valuation-response/ValuationResponseList";
import "./style.scss";
import { ValuationRequestLabelText } from "../../../views/status/Statuslabel";

export default function MyValuationRequest() {
  const id = JSON.parse(localStorage.getItem("account")).memberId;

  const [valuationRequests, setValuationRequests] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [sortOrder, setSortOrder] = useState("");
  const [valuationStatus, setValuationStatus] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState(null);

  useEffect(() => {
    const getInfo = async () => {
      try {
        const result = await getSentValuationRequest(id);
        setValuationRequests(result);
      } catch (error) {
        console.log("Error:", error.message);
        setErrorMsg("Error fetching data from server");
      }
    };
    getInfo();
  }, [id]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleStatusChange = (e) => {
    setValuationStatus(e.target.value);
  };

  const applySortingAndFiltering = (items) => {
    let filteredItems = items;

    // Apply filtering
    if (valuationStatus) {
      filteredItems = filteredItems.filter(
        (item) => item.valuationStatus === valuationStatus
      );
    }

    // Apply sorting
    if (sortOrder === "asc") {
      filteredItems.sort(
        (a, b) => new Date(a.timeRequest) - new Date(b.timeRequest)
      );
    } else if (sortOrder === "desc") {
      filteredItems.sort(
        (a, b) => new Date(b.timeRequest) - new Date(a.timeRequest)
      );
    }

    return filteredItems;
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredAndSortedItems = applySortingAndFiltering(valuationRequests);
  const currentItems = filteredAndSortedItems.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const calculateTotalPage = (itemsPerPage, items) => {
    const totalItem = items.length;
    return Math.ceil(totalItem / itemsPerPage);
  };

  const handleShowResponse = (requestId) => {
    setSelectedRequestId(requestId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    selectedRequestId(null);
  };

  return (
    <div className="container">
      <h6>VALUATION REQUEST LIST</h6>
      <hr />
      <div className="row mb-3">
        <div className="col-4">
          <FormControl fullWidth variant="standard">
            <InputLabel id="demo-simple-select-label">Request Time</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={sortOrder}
              label="reqTime"
              onChange={handleSortChange}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="asc">Oldest</MenuItem>
              <MenuItem value="desc">Newest</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="col-4">
          <FormControl fullWidth variant="standard">
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={valuationStatus}
              label="Status"
              onChange={handleStatusChange}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="PENDING_MEMBER_ACCEPTANCE">
                PENDING FOR ACCEPTANCE
              </MenuItem>
              <MenuItem value="MEMBER_ACCEPTED">ACCEPTED</MenuItem>
              <MenuItem value="REQUESTED">REQUESTED</MenuItem>
              <MenuItem value="CANCELED">REJECTED</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="row">
        <div className="shpping__cart__table">
          <table style={{ width: "100%" }}>
            <thead></thead>
            <tbody>
              {currentItems.map((request, index) => (
                <tr key={index}>
                  <td className="product__cart__item spad">
                    <div className="product__cart__item__pic">
                      <img
                        src={request.valuationImages[0]?.imageUrl}
                        alt="Photo"
                        width={"100px"}
                        height={"100px"}
                      />
                    </div>
                  </td>
                  <td>
                    <div className="product__cart__item__text ms-3">
                      <h6>
                        Time Request:{" "}
                        {new Date(request.timeRequest).toLocaleString()}
                      </h6>
                      <p>{request.description}</p>
                      <p>
                        Curent state:{" "}
                        <ValuationRequestLabelText
                          status={request.valuationStatus}
                        />
                      </p>
                    </div>
                  </td>
                  <td className="ms-3">
                    <Button onClick={() => handleShowResponse(request.id)}>
                      Show Response
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex align-items-center justify-content-center">
            <Paginator
              currentPage={currentPage}
              totalPages={calculateTotalPage(
                itemsPerPage,
                filteredAndSortedItems
              )}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Valuation Response</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedRequestId && (
            <ValuationResponseList id={selectedRequestId} />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="standard" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
