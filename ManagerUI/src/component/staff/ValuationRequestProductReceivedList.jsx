import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Pagination } from "react-bootstrap";
import { FaBackward } from "react-icons/fa";
import { Link } from "react-router-dom";
import Paginator from "../common/Paginator";

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
          <div className="">
            <Link to={"/staff-function"}>
              <FaBackward />
            </Link>
          </div>
          {/* {isLoading ? (
                    <>
                        <CircularProgress />
                    </>
                ) : ( */}
          <div className="col-lg-3"></div>
          <div className="col-lg-6">
            {currentItems.map((request) => (
              <div className="mb-3 mt-3" key={request.id}>
                <div className="card">
                  <div className="card-body">
                    <p>
                      Member Id: <strong>{request.memberId}</strong>
                    </p>
                    <p>
                      Description: <strong>{request.description}</strong>
                    </p>
                    <div className="">
                      <Button className="btn-success">
                        <Link
                          to={`/valuation-request-detail/${request.id}`}
                          style={{ color: "white", textDecoration: "none" }}
                        >
                          Confirm Information
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex align-items-center justify-content-center">
              <Paginator
                currentPage={currentPage}
                totalPages={calculateTotalPage(itemPerPage, valuationRequests)}
                onPageChange={handlePageChange}
              ></Paginator>
            </div>
          </div>
          <div className="col-lg-3"></div>
          {/* )} */}
        </div>
      </div>
    </div>
  );
};

export default ValuationRequestList;
