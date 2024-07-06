import React from "react";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import moment from "moment";
import FullScreenImage from "../../view/image/FullScreenImage";

import { postConfirmDelivery } from "../../services/apiService";

const ViewPurchasedLotDetail = ({ purchased, onHide }) => {
  console.log("purchased", purchased);

  // Ensure productImages is an array before mapping
  const imageUrls =
    purchased.productImages?.map((image) => image.imageUrl) || [];
  console.log("imageUrls", imageUrls);

  const DeliveryConfirm = async (confirm) => {
    try {
      const response = await postConfirmDelivery(purchased, confirm);

      if (response.status === "DELIVERED") {
        toast.success("Confirm DELIVERED successfully");
        onHide(true);
        setTimeout(() => {
          window.location.reload();
        }, 5000);
      } else {
        toast.error("Failed to confirm DELIVERED");
      }
    } catch (error) {
      toast.error("Error when confirming DELIVERED");
    }
  };

  return (
    <>
      <div className="col card">
        <div className="row">
          <h3 className="text-center">Purchased Lot Detail</h3>
        </div>
        <div className="row px-5">
          {purchased && (
            <>
              <div className="card card-body">
                <p>
                  Customer Name: <strong>{purchased.currentWinnerName}</strong>
                </p>
                <p>
                  Product Name: <strong>{purchased.productName}</strong>
                </p>
                <p>
                  Description: <strong>{purchased.description}</strong>
                </p>
                <p>
                  Creation Time:{" "}
                  <strong>
                    {moment(purchased.paymentInfoDTO.creationTime).format(
                      "DD/MM/YYYY HH:mm:ss"
                    )}
                  </strong>
                </p>
                <p>
                  Amount: <strong>{purchased.paymentInfoDTO.amount}$</strong>
                </p>
                <p>
                  Status Payment:{" "}
                  <strong>{purchased.paymentInfoDTO.status}</strong>
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {imageUrls.length > 0 && (
        <>
          <FullScreenImage imageUrls={imageUrls} />
        </>
      )}

      <Modal.Footer>
        <Button variant="secondary" onClick={() => onHide(false)}>
          Close
        </Button>
        <Button variant="success" onClick={() => DeliveryConfirm(true)}>
          Confirm Delivered
        </Button>
      </Modal.Footer>
    </>
  );
};

export default ViewPurchasedLotDetail;
