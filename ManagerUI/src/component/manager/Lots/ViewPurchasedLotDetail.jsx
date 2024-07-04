import React from "react";
import { Button, Carousel } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import moment from "moment";

const ViewPurchasedLotDetail = ({ valuationRequest, onHide }) => {
  // const PreliminaryConfirm = async (confirm) => {
  //   try {
  //     const response = await axios.post(
  //       `http://localhost:8080/auction-register/confirm-product-delivery/${valuationRequest.auctionRegistersId}?confirm=${confirm}`
  //     );

  //     if (response.status === 200 && response.data.status === "DELIVERED") {
  //       toast.success("Confirm DELIVERED successfully");
  //       onHide(true);
  //     } else {
  //       toast.error("Failed to confirm DELIVERED");
  //     }
  //   } catch (error) {
  //     toast.error("Error when confirming DELIVERED");
  //   }
  // };

  return (
    <>
      <div className="col card">
        <div className="row">
          <h3 className="text-center">Purchased Lot Detail</h3>
        </div>
        <div className="row px-5">
          {valuationRequest && (
            <>
              <div className="card card-body">
                <p>
                  Customer Name:{" "}
                  <strong>{valuationRequest.currentWinnerName}</strong>
                </p>
                <p>
                  Product Name: <strong>{valuationRequest.productName}</strong>
                </p>
                <p>
                  Description: <strong>{valuationRequest.description}</strong>
                </p>
                <p>
                  Creation Time:{" "}
                  <strong>
                    {moment(
                      valuationRequest.paymentInfoDTO.creationTime
                    ).format("DD/MM/YYYY HH:mm:ss")}
                  </strong>
                </p>
                <p>
                  Amount:{" "}
                  <strong>{valuationRequest.paymentInfoDTO.amount}$</strong>
                </p>
                <p>
                  Status Payment:{" "}
                  <strong>{valuationRequest.paymentInfoDTO.status}</strong>
                </p>
                <div className="col">
                  {/* <div className="row-sm-9 d-flex justify-content-center">
                    <Button
                      className="btn-success mx-3"
                      onClick={() => PreliminaryConfirm(true)}
                    >
                      Confirm to Delivered
                    </Button>
                    <Button
                      className="btn-danger mx-3"
                      onClick={() => PreliminaryConfirm(false)}
                    >
                      Reject
                    </Button>
                  </div> */}
                </div>
              </div>
            </>
          )}
        </div>
        <div className="row">
          <div className="col p-4">
            <Carousel>
              {valuationRequest.productImages &&
                valuationRequest.productImages.map((image, index) => (
                  <Carousel.Item key={index}>
                    <img
                      className="d-fluid w-70 h-50 px-5"
                      src={image.imageUrl}
                      alt={`Slide ${index}`}
                    />
                  </Carousel.Item>
                ))}
            </Carousel>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewPurchasedLotDetail;
