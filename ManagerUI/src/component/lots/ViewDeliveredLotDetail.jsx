import React from "react";
import { Button, Carousel } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import moment from "moment";
import { Modal } from "react-bootstrap";
import FullScreenImage from "../../view/image/FullScreenImage";

const ViewDeliveredLotDetail = ({ delivered, onHide }) => {
  const imageUrls =
    delivered.productImages?.map((image) => image.imageUrl) || [];
  return (
    <>
      <div className="col card">
        <div className="row">
          <h3 className="text-center">Delivered Lot Detail</h3>
        </div>
        <div className="row px-5">
          {delivered && (
            <>
              <div className="card card-body">
                <p>
                  Customer Name: <strong>{delivered.currentWinnerName}</strong>
                </p>
                <p>
                  Product Name: <strong>{delivered.productName}</strong>
                </p>
                <p>
                  Description: <strong>{delivered.description}</strong>
                </p>
                <p>
                  Creation Time:{" "}
                  <strong>
                    {moment(delivered.paymentInfoDTO.creationTime).format(
                      "DD/MM/YYYY HH:mm:ss"
                    )}
                  </strong>
                </p>
                <p>
                  Amount: <strong>{delivered.paymentInfoDTO.amount}$</strong>
                </p>
                <p>
                  Status Payment:{" "}
                  <strong>{delivered.paymentInfoDTO.status}</strong>
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
      </Modal.Footer>
    </>
  );
};

export default ViewDeliveredLotDetail;
