import React, { useEffect, useState } from "react";
import { FaBackward } from "react-icons/fa";
import { Link } from "react-router-dom";
import Paginator from "../common/Paginator";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import moment from "moment";

import {
  ValuationRequested,
  PreliminaryValuated,
  PendingApproval,
  ManagerApproved,
} from "./AllValuationRequestDetail.jsx";

import {
  getAllValuationRequests,
  getFinalValuationRequests,
} from "../../services/apiService.jsx";

export { AllValuationRequestList, PendingApprovalList };

const AllValuationRequestList = () => {
  const user = {
    id: sessionStorage.getItem("id"),
    name: sessionStorage.getItem("name"),
    role: sessionStorage.getItem("role"),
  };

  const [valuationRequests, setValuationRequests] = useState([]);
  const [currentItemsDetail, setCurrentItemsDetail] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [filteredValuationRequests, setFilteredValuationRequests] = useState(
    []
  );
  const [sortOrder, setSortOrder] = useState(""); // Default sort order
  const [sortedRequests, setSortedRequests] = useState([]);
  const sortValuationRequests = (requests) => {
    return requests.sort((a, b) => {
      const dateA = new Date(a.timeRequest);
      const dateB = new Date(b.timeRequest);
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });
  };
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    console.log("New Page:", pageNumber);
  };

  useEffect(() => {
    // setIsLoading(true)
    const getAll = async () => {
      try {
        const data = await getAllValuationRequests();
        setValuationRequests(data);
      } catch (error) {
        setErrorMsg("Error fetching data from server");
      }
    };
    getAll();
  }, []);

  const handleDetail = (item) => {
    setCurrentItemsDetail(item);
  };

  useEffect(() => {
    setFilteredValuationRequests(
      valuationRequests.filter(
        (request) =>
          selectedStatus === "" || request.valuationStatus === selectedStatus
      )
    );
  }, [selectedStatus, valuationRequests]);

  useEffect(() => {
    setSortedRequests(sortValuationRequests(filteredValuationRequests));
  }, [filteredValuationRequests, sortOrder]);
  return (
    <div className="home">
      <ToastContainer />
      <div className="homeContainer">
        <div className="ms-5">
          <div className="col">
            <div className="row">
              <div className="col-sm-7 text-center">
                <h2>Requested valuation request</h2>
                <div className="row">
                  <div className="col-3">
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                    >
                      <option value="">All</option>
                      <option value="REQUESTED">Requested</option>
                      <option value="PRELIMINARY_VALUATED">
                        Preliminary Valuated
                      </option>
                      <option value="PRODUCT_RECEIVED">Product Received</option>
                      <option value="PENDING_MANAGER_APPROVAL">
                        Pending Manager Approval
                      </option>
                      <option value="MANAGER_APPROVED">Manager Approved</option>
                      <option value="PENDING_MEMBER_ACCEPTANCE">
                        Pending Member Acceptance
                      </option>
                      <option value="MEMBER_ACCEPTED">Member Accepted</option>
                      <option value="CANCELED">Canceled</option>
                    </select>
                  </div>
                  <div className="col-3">
                    <select
                      id="sortOrder"
                      value={sortOrder}
                      onChange={(e) => setSortOrder(e.target.value)}
                    >
                      <option value="">Sort by Date</option>{" "}
                      {/* Default option */}
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
                      {sortedRequests.map((request, key) => (
                        <>
                          <tr>
                            <th scope="row">{key + 1}</th>
                            <td>Member {request.memberId}</td>
                            <td>
                              {/* {request.timeRequest} */}
                                {moment(request.timeRequest).format(
                                  "DD/MM/YYYY HH:mm:ss"
                                )}
                            </td>
                            <td>{request.valuationStatus}</td>
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
                        </>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="col-sm-5">
                {currentItemsDetail &&
                  currentItemsDetail.valuationStatus === "REQUESTED" && (
                    <>
                      <ValuationRequested
                        valuationRequest={currentItemsDetail}
                        onHide={() => setCurrentItemsDetail(null)}
                        staffId={user.id}
                      />
                    </>
                  )}
                {currentItemsDetail &&
                  currentItemsDetail.valuationStatus ===
                    "PRELIMINARY_VALUATED" && (
                    <>
                      <PreliminaryValuated
                        valuationRequest={currentItemsDetail}
                        onHide={() => setCurrentItemsDetail(null)}
                        staffId={user.id}
                      />
                    </>
                  )}
                {currentItemsDetail &&
                  currentItemsDetail.valuationStatus === "MANAGER_APPROVED" && (
                    <>
                      <ManagerApproved
                        valuationRequest={currentItemsDetail}
                        onHide={() => setCurrentItemsDetail(null)}
                        staffId={user.id}
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

const PendingApprovalList = () => {
  const [Finalvaluation, setFinalValuation] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(10);

  const handleUpdate = (e) => {
    console.log("Update");
    window.location.reload();
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const getList = async () => {
      try {
        const data = await getFinalValuationRequests();
        setFinalValuation(data);
      } catch (error) {
        console.log("Error nek:", error.message);
        setErrorMsg("Error fetching data from server");
      }
    };
    getList();
  }, []);

  const calculateTotalPage = (itemPerPage, Finalvaluation) => {
    const totalItem = Finalvaluation.length;
    return Math.ceil(totalItem / itemPerPage);
  };

  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = Finalvaluation.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="container">
      <div className="row  d-flex justify-content-center">
        <div className="col-lg-10">
          <div className="row">
            <h2 className="text-center">Pending Approval List</h2>
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
                {currentItems.map((request, key) => (
                  <>
                    <tr>
                      <th scope="row">{key + 1}</th>
                      <td>Member {request.memberId}</td>
                      <td>
                        {/* {request.timeRequest} */}
                        {moment(request.timeRequest).format(
                          "DD/MM/YYYY HH:mm:ss"
                        )}
                      </td>
                      <td>{request.valuationStatus}</td>
                      <td>
                        <PendingApproval
                          valuationRequestId={request.id}
                          onUpdate={() => handleUpdate()}
                        />
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>

          <div className="row">
            <div className="flex align-items-center justify-content-center">
              <Paginator
                currentPage={currentPage}
                totalPages={calculateTotalPage(itemPerPage, Finalvaluation)}
                onPageChange={handlePageChange}
              ></Paginator>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
