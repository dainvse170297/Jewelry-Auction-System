import axios from "axios";
import React, { useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";
import { FaBackward } from "react-icons/fa";
import { Link } from "react-router-dom";
import Paginator from "../common/Paginator";
import moment from "moment";
import { Button } from "@mui/material";

const ValuationRequestList = () => {
  const [valuationRequests, setValuationRequests] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(5);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    console.log("New Page:", pageNumber);
  };

  useEffect(() => {
    const getAll = async () => {
      try {
        axios
          .get(
            "http://localhost:8080/valuation/request/status/product-received"
          )
          .then((result) => {
            setValuationRequests(result.data);
          });
      } catch (error) {
        console.log("Error nek:", error.message);
        setErrorMsg("Error fetching data from server");
      }
    };
    getAll();
  }, []);

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
      <div className="homeContainer">
        <div className="ms-5">
          {/* <div className="">
            <Link to={"/staff-function"}>
              <FaBackward />
            </Link>
          </div> */}
          {/* {isLoading ? (
                    <>
                        <CircularProgress />
                    </>
                ) : ( */}
          <div className="col-lg-10">
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Member ID</th>
                  <th>Description</th>
                  <th>Time</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((request, index) => (
                  <tr key={index}>
                    <td></td>
                    <td>
                      {request.memberId}
                    </td>
                    <td>
                      <div className="">
                        {request.description}
                      </div>
                      <div className="">
                        Estimate Price: ${request.estimatePriceMin} - ${request.estimatePriceMax}
                      </div>
                    </td>
                    <td>
                      {moment(request.timeRequest).format("DD/MM/YYYY HH:mm:ss")}
                    </td>
                    <td>
                      <Link
                        to={`/valuation-request/product-received/confirm/${request.id}`}
                      >
                        <Button>Confirm</Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex align-items-center justify-content-center">
              <Paginator
                currentPage={currentPage}
                totalPages={calculateTotalPage(itemPerPage, valuationRequests)}
                onPageChange={handlePageChange}
              ></Paginator>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValuationRequestList;
