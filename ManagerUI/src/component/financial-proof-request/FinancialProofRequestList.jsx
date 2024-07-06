import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { FinancialProofRequestDetail } from "./FinancialProofRequestDetail"; // Correct named import
import { postSentFinancialProof } from "../../services/apiService";

import moment from "moment";
import Form from "react-bootstrap/Form";
const FinancialProofRequestList = () => {
  const user = {
    id: sessionStorage.getItem("id"),
    name: sessionStorage.getItem("name"),
    role: sessionStorage.getItem("role"),
  };

  const statusOptions = [
    { value: "REQUESTED", label: "Requested" },
    { value: "AVAILABLE", label: "Available" },
    { value: "PENDING_MANAGER_APPROVAL", label: "Pending Manager Approval" },
    { value: "REJECTED", label: "Rejected" },
    { value: "CANCELED", label: "Canceled" },
  ];
  const [dateOptions, setDateOptions] = useState([
    { value: "newest", label: "Newest" },
    { value: "oldest", label: "Oldest" },
  ]);

  const [financialProofRequests, setFinancialProofRequests] = useState([]);
  const [currentItemsDetail, setCurrentItemsDetail] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("REQUESTED");
  const [filteredFinancialRequests, setFilteredFinancialRequests] = useState(
    []
  );
  const [sortOrder, setSortOrder] = useState(""); // Default sort order
  const [sortedRequests, setSortedRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(10); // Items per page
  const [totalPages, setTotalPages] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [showModal, setShowModal] = useState(false); // Modal state

  // Function to fetch data from the API
  const fetchFinancialProofRequests = async (status, page, size) => {
    try {
      const data = await postSentFinancialProof(status, page, size);
      setFinancialProofRequests(data.content || []);
      setTotalPages(data.totalPages || 0);
    } catch (error) {
      setErrorMsg("Error fetching data from server");
    }
  };

  // Fetch data on initial load and when `selectedStatus`, `currentPage`, or `pageSize` changes
  useEffect(() => {
    fetchFinancialProofRequests(selectedStatus, currentPage, pageSize);
  }, [selectedStatus, currentPage, pageSize]);

  // Update filtered requests when `selectedStatus` or `valuationRequests` changes
  useEffect(() => {
    if (financialProofRequests && financialProofRequests.length > 0) {
      setFilteredFinancialRequests(
        financialProofRequests.filter(
          (request) =>
            selectedStatus === "" || request.status === selectedStatus
        )
      );
    } else {
      setFilteredFinancialRequests([]);
    }
  }, [selectedStatus, financialProofRequests]);

  useEffect(() => {
    const sorted = sortValuationRequests(filteredFinancialRequests);
    setSortedRequests(sorted);
  }, [filteredFinancialRequests, sortOrder]);

  // Function to sort valuation requests
  const sortValuationRequests = (requests) => {
    return [...requests].sort((a, b) => {
      const dateA = new Date(a.timeRequest);
      const dateB = new Date(b.timeRequest);
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });
  };

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Function to handle showing detail of a request
  const handleDetail = (item) => {
    setCurrentItemsDetail(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setCurrentItemsDetail(null);
    setShowModal(false);
  };

  return (
    <div className="home">
      <div className="homeContainer">
        <div className="ms-5">
          <div className="col">
            <div className="row">
              <div className="col-sm-11 text-center">
                <h2>Requested Financial Proof Requests</h2>
                <div className="row">
                  <div className="col-5">
                    <Form.Select
                      onChange={(e) => setSelectedStatus(e.target.value)}
                    >
                      {statusOptions.map((option, index) => (
                        <option key={index} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Form.Select>
                  </div>
                  <div className="col-3">
                    <Form.Select onChange={(e) => setSortOrder(e.target.value)}>
                      {dateOptions.map((option, index) => (
                        <option key={index} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Form.Select>
                  </div>
                </div>

                <div className="row  d-flex justify-content-center">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">From</th>
                        <th scope="col">Time</th>
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedRequests.map((request, index) => (
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <td>Member {request.memberId}</td>
                          <td>
                            {moment(request.timeRequest).format(
                              "DD/MM/YYYY HH:mm:ss"
                            )}
                          </td>
                          <td>{request.status}</td>
                          <td>
                            <button
                              onClick={() => handleDetail(request)}
                              className="btn btn-primary"
                              type="button"
                            >
                              Detail
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="row">
                  <div className="col d-flex justify-content-center">
                    <nav>
                      <ul className="pagination">
                        {[...Array(totalPages)].map((_, index) => (
                          <li
                            key={index}
                            className={`page-item ${
                              currentPage === index ? "active" : ""
                            }`}
                          >
                            <button
                              className="page-link"
                              onClick={() => handlePageChange(index)}
                            >
                              {index + 1}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>

              <div className="col-sm-5">
                {currentItemsDetail && (
                  <Modal show={showModal} onHide={handleCloseModal} size="lg">
                    <Modal.Header closeButton>
                      <Modal.Title>Financial Proof Detail</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <FinancialProofRequestDetail
                        financialProofRequest={currentItemsDetail} // Pass current detail item as props
                        onHide={handleCloseModal} // Pass close modal function
                        staffId={user.id} // Pass staff id (assuming user.id is staff id)
                        userRole={user.role}
                      />
                    </Modal.Body>
                  </Modal>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { FinancialProofRequestList };
