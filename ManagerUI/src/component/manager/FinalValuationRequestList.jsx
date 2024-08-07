import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { FaBackward } from "react-icons/fa";
import { Link } from "react-router-dom";
import Paginator from "../common/Paginator";
import { getFinalValuationRequests } from "../../services/apiService";

export default function FinalValuationRequestList() {
  const [Finalvaluation, setFinalValuation] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(5);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    console.log("New Page:", pageNumber);
  };

  useEffect(() => {
    // setIsLoading(true)
    const getList = async () => {
      try {
        const response = await getFinalValuationRequests();
        setFinalValuation(response);
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
      <div className="row">
        <div className="">
          <Link to={"/manager"}>
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
                        to={`/final-valuation-request-detail/${request.id}`}
                        style={{ color: "white", textDecoration: "none" }}
                      >
                        View Details
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
              totalPages={calculateTotalPage(itemPerPage, Finalvaluation)}
              onPageChange={handlePageChange}
            ></Paginator>
          </div>
        </div>
        <div className="col-lg-3"></div>
        {/* )} */}
      </div>
    </div>
  );
}
