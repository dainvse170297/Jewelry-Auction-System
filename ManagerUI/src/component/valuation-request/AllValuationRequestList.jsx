import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaBackward } from "react-icons/fa";
import { Link } from "react-router-dom";
import Paginator from "../common/Paginator";
import Sidebar from "../layout/sidebar/Sidebar";
import "../home/home.scss";
import Navbar from "../layout/navbar/Navbar";
import { ToastContainer, toast } from "react-toastify";
import AllValuationRequestDetail from "./AllValuationRequestDetail";

const AllValuationRequestList = () => {
  const [valuationRequests, setValuationRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(40);
  const [currentItemsDetail, setCurrentItemsDetail] = useState(null);

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
    console.log("Detail: ", item);
    setCurrentItemsDetail(item);
    setPreliminaryValuation({
      id: item.id,
      estimateMin: "",
      estimateMax: "",
    });
  };

  const calculateTotalPage = (itemPerPage, valuationRequests) => {
    const totalItem = valuationRequests.length;
    return Math.ceil(totalItem / itemPerPage);
  };

  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = valuationRequests.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

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
                            <td>{request.timeRequest}</td>
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

                <div className="row">
                  <div className="flex align-items-center justify-content-center">
                    <Paginator
                      currentPage={currentPage}
                      totalPages={calculateTotalPage(
                        itemPerPage,
                        valuationRequests
                      )}
                      onPageChange={handlePageChange}
                    ></Paginator>
                  </div>
                </div>
              </div>

              <div className="col-sm-5">
                <AllValuationRequestDetail
                  valuationRequest={currentItemsDetail}
                />
              </div>
            </div>
          </div>

          <div className="col-lg-3"></div>
          <div className="col-lg-6"></div>
          <div className="col-lg-3"></div>
          {/* )} */}
        </div>
      </div>
    </div>
  );
};

export default AllValuationRequestList;
