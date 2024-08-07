import axios from "axios";
import React, { useEffect, useState } from "react";
import "./AuctionRegisterHistoryList.scss";
import { useNavigate } from "react-router-dom";
import Paginator from "../../common/Paginator";
import { getAuctionRegisterHistory } from "../../../services/apiService";
import { LinearProgress } from "@mui/material";

const AuctionRegisterHistoryList = () => {
  const id = JSON.parse(localStorage.getItem("account")).memberId;
  const navigate = useNavigate();

  const [auctionRegisterHistoryList, setAuctionRegisterHistoryList] = useState(
    []
  );
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = auctionRegisterHistoryList.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const calculateTotalPage = (itemsPerPage, items) => {
    const totalItem = items.length;
    return Math.ceil(totalItem / itemsPerPage);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    setIsLoading(true);
    const getAuctionRegisterHistoryList = async () => {
      try {
        const response = await getAuctionRegisterHistory(id);
        setAuctionRegisterHistoryList(response);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getAuctionRegisterHistoryList();
  }, [id]);

  const handleClick = ({ lotId, status }) => {
    if (status === "LIVE") {
      navigate(`/live-lot-detail/${lotId}`);
    } else if (status === "UPCOMING") {
      navigate(`/upcoming-session-lot/${lotId}`);
    }
  };

  return (
    <>
      <h6>AUCTION REGISTER HISTORY LIST</h6>
      <hr />

      <div className="container">
        <div className="row">
          <table className="table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Status</th>
                <th>Price</th>
                <th>Session Status</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr key={index}>
                  <td>
                    <img
                      src={item.lot?.product?.productImages[0]?.imageUrl}
                      alt={item.lot?.product?.name}
                      style={{ width: "100px" }}
                    />
                  </td>
                  <td>
                    <a
                      onClick={() =>
                        handleClick({
                          lotId: item.lot?.id,
                          status: item.lot?.auctionSession?.status,
                        })
                      }
                      className="a-name"
                    >
                      <strong>{item.lot?.product?.name}</strong>
                    </a>
                  </td>
                  <td>
                    <button
                      className={
                        item.lot?.status === "SOLD" ? "btn btn-danger" : "btn"
                      }
                      disabled
                    >
                      {item.lot?.status}
                    </button>
                  </td>
                  <td>${item.lot?.currentPrice}</td>
                  <td>
                    <button
                      className={
                        item.lot?.auctionSession?.status === "LIVE"
                          ? "btn btn-success"
                          : "btn btn-warning"
                      }
                      disabled
                    >
                      {item.lot?.auctionSession?.status}
                    </button>
                  </td>
                  <td></td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </table>
          {isLoading && <LinearProgress color="error" />}
          <div className="flex align-items-center justify-content-center">
            <Paginator
              currentPage={currentPage}
              totalPages={calculateTotalPage(
                itemsPerPage,
                auctionRegisterHistoryList
              )}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AuctionRegisterHistoryList;
