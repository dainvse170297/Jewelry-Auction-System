import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaBackward } from "react-icons/fa";
import { Link } from "react-router-dom";
import Paginator from "../common/Paginator";
import Sidebar from "../../layouts/sidebar/Sidebar.jsx";
import "../home/home.scss";
import Navbar from "../layout/navbar/Navbar";
import { ToastContainer, toast } from "react-toastify";
import AllValuationRequestDetail from "./AllValuationRequestDetail.jsx";
import moment from "moment";

const AllValuationRequestList = () => {
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
        axios.get("http://localhost:8080/valuation/all").then((result) => {
          setValuationRequests(result.data);
        });
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
      <Sidebar />
      <ToastContainer />
      <div className="homeContainer">
        <Navbar />
        <div className="ms-5">
          <div className="">
            <Link to={"/staff-function"}>
              <FaBackward />
            </Link>
          </div>

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
                {currentItemsDetail && (
                  <>
                    <AllValuationRequestDetail
                      valuationRequest={currentItemsDetail}
                      onHide={() => setCurrentItemsDetail(null)}
                    />
                  </>
                )}
              </div>
            </div>
          </div>

          {/* <div className="col-lg-3"></div>
          <div className="col-lg-6"></div>
          <div className="col-lg-3"></div> */}
          {/* )} */}
        </div>
      </div>
    </div>
  );
};

export default AllValuationRequestList;
