import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaBackward } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getAllFinancialProof } from "../../services/apiService.jsx";
import { ToastContainer, toast } from "react-toastify";
import { Button, Form, Modal, Carousel } from "react-bootstrap";
import {
  FinancialProofRequestDetail,
  VIPFinancialProofRequestDetail,
} from "./FinancialProofRequestDetail"; // Correct named import

import moment from "moment";
const FinancialProofRequestList = () => {
  const user = {
    id: sessionStorage.getItem("id"),
    name: sessionStorage.getItem("name"),
    role: sessionStorage.getItem("role"),
  };

  const [valuationRequests, setValuationRequests] = useState([]);
  const [currentItemsDetail, setCurrentItemsDetail] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("REQUESTED");
  const [filteredValuationRequests, setFilteredValuationRequests] = useState(
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
      const formData = new FormData();
      formData.append("status", status);
      formData.append("page", page);
      formData.append("size", size);

      const response = await axios.post(
        "http://localhost:8080/financial-proof/financial-proof-requests",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setValuationRequests(response.data.content || []);
      setTotalPages(response.data.totalPages || 0);
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
    if (valuationRequests && valuationRequests.length > 0) {
      setFilteredValuationRequests(
        valuationRequests.filter(
          (request) =>
            selectedStatus === "" || request.status === selectedStatus
        )
      );
    } else {
      setFilteredValuationRequests([]);
    }
  }, [selectedStatus, valuationRequests]);

  // Update sorted requests when `filteredValuationRequests` or `sortOrder` changes
  useEffect(() => {
    const sorted = sortValuationRequests(filteredValuationRequests);
    setSortedRequests(sorted);
  }, [filteredValuationRequests, sortOrder]);

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
              <div className="col-sm-7 text-center">
                <h2>Requested Financial Proof Requests</h2>
                <div className="row">
                  <div className="col-3">
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                    >
                      <option value="REQUESTED">Requested</option>
                      <option value="PENDING_MANAGER_APPROVAL">
                        Pending Manager Approval
                      </option>
                      <option value="AVAILABLE">Available</option>
                      <option value="REJECTED">Rejected</option>
                      <option value="CANCELED">Canceled</option>
                    </select>
                  </div>
                  <div className="col-3">
                    <select
                      id="sortOrder"
                      value={sortOrder}
                      onChange={(e) => setSortOrder(e.target.value)}
                    >
                      <option value="">Sort by Date</option>
                      <option value="newest">Newest</option>
                      <option value="oldest">Oldest</option>
                    </select>
                  </div>
                </div>

                <div className="row">
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
                  <div className="col">
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
                        valuationRequest={currentItemsDetail} // Pass current detail item as props
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

const VIPFinancialProofRequestList = () => {
  const user = {
    id: sessionStorage.getItem("id"),
    name: sessionStorage.getItem("name"),
    role: sessionStorage.getItem("role"),
  };

  const [valuationRequests, setValuationRequests] = useState([]);
  const [currentItemsDetail, setCurrentItemsDetail] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("REQUESTED");
  const [filteredValuationRequests, setFilteredValuationRequests] = useState(
    []
  );
  const [sortOrder, setSortOrder] = useState(""); // Default sort order
  const [sortedRequests, setSortedRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(10); // Items per page
  const [totalPages, setTotalPages] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");

  // Function to fetch data from the API
  const fetchFinancialProofRequests = async (status, page, size) => {
    try {
      const formData = new FormData();
      formData.append("status", status);
      formData.append("page", page);
      formData.append("size", size);

      const response = await axios.post(
        "http://localhost:8080/financial-proof/financial-proof-requests",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setValuationRequests(response.data.content || []); // Assuming API returns `content`
      setTotalPages(response.data.totalPages || 0); // Assuming API returns `totalPages`
      console.log("response", response);
      console.log("totalPages", response.data.totalPages);
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
    if (valuationRequests && valuationRequests.length > 0) {
      setFilteredValuationRequests(
        valuationRequests.filter(
          (request) =>
            selectedStatus === "" || request.status === selectedStatus
        )
      );
    } else {
      setFilteredValuationRequests([]);
    }
  }, [selectedStatus, valuationRequests]);

  // Update sorted requests when `filteredValuationRequests` or `sortOrder` changes
  useEffect(() => {
    const sorted = sortValuationRequests(filteredValuationRequests);
    setSortedRequests(sorted);
  }, [filteredValuationRequests, sortOrder]);

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
  };

  return (
    <div className="home">
      <div className="homeContainer">
        <div className="ms-5">
          <div className="col">
            <div className="row">
              <div className="col-sm-7 text-center">
                <h2>Requested Financial Proof Request</h2>
                <div className="row">
                  <div className="col-3">
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                    >
                      <option value="REQUESTED">Requested</option>
                      <option value="PENDING_MANAGER_APPROVAL">
                        Pending Manager Approval
                      </option>
                      <option value="AVAILABLE">Available</option>
                      <option value="REJECTED">Rejected</option>
                      <option value="CANCELED">Canceled</option>
                    </select>
                  </div>
                  <div className="col-3">
                    <select
                      id="sortOrder"
                      value={sortOrder}
                      onChange={(e) => setSortOrder(e.target.value)}
                    >
                      <option value="">Sort by Date</option>
                      <option value="newest">Newest</option>
                      <option value="oldest">Oldest</option>
                    </select>
                  </div>
                </div>

                <div className="row">
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
                  <div className="col">
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
                  <>
                    <VIPFinancialProofRequestDetail
                      valuationRequest={currentItemsDetail}
                      onHide={() => setCurrentItemsDetail(null)}
                      managerId={user.id}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { FinancialProofRequestList, VIPFinancialProofRequestList };
