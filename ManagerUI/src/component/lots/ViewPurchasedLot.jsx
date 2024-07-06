import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import ViewPurchasedLotDetail from "./ViewPurchasedLotDetail";
import { Modal } from "react-bootstrap";
import moment from "moment";
import { getListPurchasedLot } from "../../services/apiService";

const ViewPurchasedLot = () => {
  const user = {
    id: sessionStorage.getItem("id"),
    name: sessionStorage.getItem("name"),
    role: sessionStorage.getItem("role"),
  };

  const [purchased, setPurchased] = useState([]);
  const [currentItemsDetail, setCurrentItemsDetail] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [filteredPurchased, setFilteredPurchased] = useState([]);
  const [showModal, setShowModal] = useState(false); // Modal state

  useEffect(() => {
    const getAll = async () => {
      try {
        const result = await getListPurchasedLot();
        console.log("Fetched data:", result); // Debug fetched data
        setPurchased(result); // Set the data directly from result
      } catch (error) {
        toast.error("Error fetching data from server");
      }
    };
    getAll();
  }, []);

  const handleDetail = (item) => {
    console.log("Item Detail:", item); // Add this line to log item detail
    setCurrentItemsDetail(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setCurrentItemsDetail(null);
    setShowModal(false);
  };

  useEffect(() => {
    if (purchased && Array.isArray(purchased)) {
      setFilteredPurchased(
        purchased.filter(
          (request) =>
            selectedStatus === "" || request.status === selectedStatus
        )
      );
    }
  }, [selectedStatus, purchased]);

  return (
    <div className="home">
      <ToastContainer />
      <div className="homeContainer">
        <div className="ms-5">
          <div className="col">
            <div className="row">
              <div className="col-sm-11 text-center">
                <div className="my-5">
                  <h2>Waiting To Deliver</h2>
                </div>

                <div className="row">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Current Winner Name</th>
                        <th scope="col">Product Name</th>
                        <th scope="col">Time Payment</th>
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPurchased.map((request, key) => (
                        <tr key={request.id}>
                          <th scope="row">{key + 1}</th>
                          <td>{request.currentWinnerName}</td>
                          <td>{request.productName}</td>
                          <td>
                            {moment(request.paymentInfoDTO.creationTime).format(
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
              </div>

              <div className="col-sm-5">
                {currentItemsDetail && (
                  <Modal show={showModal} onHide={handleCloseModal} size="lg">
                    <Modal.Header closeButton>
                      <Modal.Title>Purchased Lot Detail</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <ViewPurchasedLotDetail
                        purchased={currentItemsDetail}
                        onHide={handleCloseModal}
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

export { ViewPurchasedLot, ViewPurchasedLotDetail };
