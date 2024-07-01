import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaBackward } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import ViewPurchasedLotDetail from "../Lots/ViewPurchasedLotDetail";

import moment from "moment";

const ViewPurchasedLot = () => {
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
      const dateA = new Date(a.endTime);
      const dateB = new Date(b.endTime);
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });
  };

  useEffect(() => {
    const getAll = async () => {
      try {
        axios
          .get("http://localhost:8080/lot/view-list-delivered-lot")
          .then((result) => {
            setValuationRequests(result.data);
          });
      } catch (error) {
        toast.error("Error fetching data from server");
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
        (request) => selectedStatus === "" || request.status === selectedStatus
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
          <div className="">
            <Link to={"/staff-function"}>
              <FaBackward />
            </Link>
          </div>

          <div className="col">
            <div className="row">
              <div className="col-sm-7 text-center">
                <h2>List of Purchased Lot</h2>

                <div className="row">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Current Winner Name</th>
                        <th scope="col">Product Name</th>
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedRequests.map((request, key) => (
                        <tr key={request.id}>
                          <th scope="row">{key + 1}</th>
                          <td>{request.currentWinnerName}</td>
                          <td>{request.productName}</td>
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
              </div>

              <div className="col-sm-5">
                {currentItemsDetail && (
                  <ViewPurchasedLotDetail
                    valuationRequest={currentItemsDetail}
                    onHide={() => setCurrentItemsDetail(null)}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ViewPurchasedLot, ViewPurchasedLotDetail };
