import React, { useEffect, useState } from "react";
import Paginator from "../common/Paginator";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";
import Form from "react-bootstrap/Form";
import Loading from "../../view/loading/Loading.jsx";

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

  const [isLoading, setIsLoading] = useState(false);

  const statusOptions = [
    { value: "REQUESTED", label: "Requested" },
    { value: "PRELIMINARY_VALUATED", label: "Preliminary Valuated" },
    { value: "PRODUCT_RECEIVED", label: "Product Received" },
    { value: "PENDING_MANAGER_APPROVAL", label: "Pending Manager Approval" },
    { value: "MANAGER_APPROVED", label: "Manager Approved" },
    { value: "PENDING_MEMBER_ACCEPTANCE", label: "Pending Member Acceptance" },
    { value: "MEMBER_ACCEPTED", label: "Member Accepted" },
    { value: "CANCELED", label: "Canceled" },
  ];
  const [dateOptions, setDateOptions] = useState([
    { value: "newest", label: "Newest" },
    { value: "oldest", label: "Oldest" },
  ]);

  const [valuationRequests, setValuationRequests] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(statusOptions[0].value);
  const [filteredValuationRequests, setFilteredValuationRequests] = useState(
    []
  );

  const [sortOrder, setSortOrder] = useState(dateOptions[0].value); // Default sort order
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
    setIsLoading(true);
    const getAll = async () => {
      try {
        const data = await getAllValuationRequests();
        setValuationRequests(data);
        setIsLoading(false);
        isLoading(false);
      } catch (error) {
        setErrorMsg("Error fetching data from server");
      }
    };
    getAll();
  }, []);

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
          <div className="row d-flex justify-content-center">
            <div className="col-sm-11">
              <h2 className="text-center">Requested valuation request</h2>
              <div className="row">
                <hr />
                <div className="col-5">
                  <Form.Select
                    onChange={(e) => setSelectedStatus(e.target.value)}
                  >
                    {statusOptions.map((option) => (
                      <option value={option.value}>{option.label}</option>
                    ))}
                  </Form.Select>
                </div>
                <div className="col-3">
                  <Form.Select onChange={(e) => setSortOrder(e.target.value)}>
                    {dateOptions.map((option) => (
                      <option value={option.value}>{option.label}</option>
                    ))}
                  </Form.Select>
                </div>
              </div>

              <div className="row  text-center">
                {isLoading ? (
                  <Loading delaytime={0} />
                ) : (
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
                      {sortedRequests.length === 0 && (
                        <tr>
                          <td colSpan="5">No data!!</td>
                        </tr>
                      )}
                      {sortedRequests.map((request, key) => (
                        <>
                          <tr>
                            <th scope="row">{key + 1}</th>
                            <td>Member {request.memberId}</td>
                            <td>
                              {moment(request.timeRequest).format(
                                "DD/MM/YYYY HH:mm:ss"
                              )}
                            </td>
                            <td>{request.valuationStatus}</td>
                            <td>
                              {request.valuationStatus === "REQUESTED" && (
                                <ValuationRequested
                                  valuationRequestId={request.id}
                                />
                              )}
                              {request.valuationStatus ===
                                "PRELIMINARY_VALUATED" && (
                                <PreliminaryValuated
                                  valuationRequestId={request.id}
                                />
                              )}
                            </td>
                          </tr>
                        </>
                      ))}
                    </tbody>
                  </table>
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
