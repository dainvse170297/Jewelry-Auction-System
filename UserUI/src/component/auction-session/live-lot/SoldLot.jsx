import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { LinearProgress } from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Button, Carousel, Modal } from "react-bootstrap";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import {
    getBidHistory,
    getLiveLotDetail,
    getProfileDetail,
    postPlaceBidding,
} from "../../../services/apiService";
import Countdown from "../../countdown/Countdown";
import WebSocketHandler from "../../web-socket-handler/WebSocketHandler";
import "./LiveLotDetail.scss";
import ImageGallery from "../../../views/image/ImageGallery";
const SoldLot = ({ productInfo, bidHistory, goBack, winningMessage }) => {

    const maskName = (name) => {
        const [firstName] = name.split(" ");
        const maskedPart = '*'.repeat(7);
        return `${firstName} ${maskedPart}`;
    }

    return (
        <>
            <div className="">
                <a onClick={goBack} className="a">
                    <ArrowBackIcon /> BACK TO AUCTION
                </a>
            </div>
            <hr />
            <h3>Live Auction</h3>


            <div className="row mt-5">
                <div className="col-lg-6">
                    {productInfo.productImages && (
                        <ImageGallery
                            images={productInfo.productImages.map(
                                (item, index) => item.imageUrl
                            )}
                        />
                    )}
                </div>
                <div className="col-lg-6">
                    <div className="clock">
                        <div className="mx-auto">
                            <Countdown targetDate={productInfo.endTime} />
                        </div>
                    </div>
                    <hr />
                    <div className="item-infor mt-2">
                        <h4>
                            <strong>{productInfo.productName}</strong>
                        </h4>
                        <div className="d-flex justify-content-center">
                            <div className="d-flex align-items-center">
                            </div>
                        </div>
                        <div className="d-flex justify-content-center mt-2">
                            <div className="d-flex align-items-center">
                                <h6 className="buy_now_price">
                                    SOLD FOR : ${" "}
                                    {productInfo.currentPrice}
                                </h6>
                            </div>
                        </div>
                        <div className="d-flex justify-content-center mt-2">
                            <div className="d-flex align-items-center">
                                <h4 className="me-3 text-success">{winningMessage}</h4>
                            </div>
                        </div>
                        <div className="row">
                            {bidHistory.length > 0 && (
                                <div className="col mt-3">
                                    <div className="bid-history">
                                        <h5 className="text-center">Bid History</h5>
                                        <hr />
                                        {bidHistory.slice(0, 6).map((item, index) => (
                                            <div key={index} className="">
                                                <p className="mb-1 pb-1">
                                                    {maskName(item.memberName)} -
                                                    ${item.price}{" "}
                                                    <span>
                                                        {moment(item.bidTime).format(
                                                            "YYYY-MM-DD HH:mm"
                                                        )}
                                                    </span>
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        <ToastContainer />
                    </div>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-sm-9 px-0">
                    <div className="border rounded-2 py-2 pe-4 me-1 ps-3">
                        <h4>Product Details</h4>
                        <p className="mb-3">
                            <strong>{productInfo.productName}</strong>
                        </p>
                        <p className="mb-3">{productInfo.description}</p>
                        <p className="mb-3">
                            Start price : <strong>${productInfo.startPrice}</strong>{" "}
                        </p>
                        <p className="mb-3">
                            Estimate price:{" "}
                            <strong>
                                ${productInfo.estimatePriceMin} - $
                                {productInfo.estimatePriceMax}{" "}
                            </strong>{" "}
                        </p>
                    </div>
                </div>
                <div className="col-sm-3 h-100">
                    <div className="border rounded-2 py-2 ps-3 ms-1 h-100">
                        <h4>Useful for you</h4>
                        <ul>
                            <li>
                                <a href="/selling">How to sell my jewelry?</a>
                            </li>
                            <li>
                                <a href="/contact">Contact for support?</a>
                            </li>
                            <li>
                                <a href="/privacy-policy">Our policies</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SoldLot