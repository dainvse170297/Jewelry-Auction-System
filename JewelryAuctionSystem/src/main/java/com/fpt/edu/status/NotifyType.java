package com.fpt.edu.status;

public enum NotifyType {

    //Valuation request
    REQUEST,
    VALUATION_REQUEST_SUCCESS,
    VALUATION_REQUEST_PRELIMINARY,
    VALUATION_REQUEST_PRODUCT_RECEIVED,
    VALUATION_REQUEST_CANCEL,

    //Response
    PRELIMINARY_VALUATION,//response
    FINAL_VALUATION,//response

    //Lot
    AUCTION_REGISTERED,//request
    LIVE_AUCTION,//auction session
    LIVE_LOT,
    WINNER,// go to checkout

    //Financial proof request
    FINANCIAL_APPROVED,// financial proof request
    FINANCIAL_REJECTED,// financial proof request

    //Payment
    PAYMENT,//payment
}
