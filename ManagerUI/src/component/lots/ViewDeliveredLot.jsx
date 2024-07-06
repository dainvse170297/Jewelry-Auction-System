import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import ViewDeliveredLotDetail from "./ViewDeliveredLotDetail";
import { Modal } from "react-bootstrap";
import moment from "moment";
import { getDeliveredLots } from "../../services/apiService";

const ViewDeliveredLot = () => {
  const user = {
    id: sessionStorage.getItem("id"),
    name: sessionStorage.getItem("name"),
    role: sessionStorage.getItem("role"),
  };

  const [delivered, setDelivered] = useState([]);
  const [currentItemsDetail, setCurrentItemsDetail] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [filteredDelivered, setFilteredDelivered] = useState([]);
  const [showModal, setShowModal] = useState(false); // Modal state

  useEffect(() => {
    const getAll = async () => {
      try {
        const response = await getDeliveredLots();
        setDelivered(response);
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
    if (delivered && Array.isArray(delivered)) {
      setFilteredDelivered(
        delivered.filter(
          (request) =>
            selectedStatus === "" || request.status === selectedStatus
        )
      );
    }
  }, [selectedStatus, delivered]);

  return (
    <div className="home">
      <ToastContainer />
      <div className="homeContainer">
        <div className="ms-5">
          <div className="col">
            <div className="row">
              <div className="col-sm-11 text-center">
                <div className="my-5">
                  <h2>Delivered Lot</h2>
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
                      {filteredDelivered.map((request, key) => (
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
                      <Modal.Title>Delivered Lot Detail</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <ViewDeliveredLotDetail
                        delivered={currentItemsDetail}
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

export { ViewDeliveredLot, ViewDeliveredLotDetail };
