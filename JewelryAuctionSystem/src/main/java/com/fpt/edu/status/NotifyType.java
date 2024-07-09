package com.fpt.edu.status;

public enum NotifyType {
    REQUEST,//request
    PRELIMINARY_VALUATION,//response
    FINAL_VALUATION,//response
    AUCTION_REGISTERED,//request
    LIVE_AUCTION,//auction session
    LIVE_LOT,
    VALUATION_REQUEST_SUCCESS,//response
    VALUATION_REQUEST_PRODUCT_RECEIVED,
    VALUATION_REQUEST_PRELIMINARY,//response
    VALUATION_REQUEST_CANCEL,//response
    WINNER,// go to checkout
    FINANCIAL_APPROVED,
    FINANCIAL_REJECTED,
    PAYMENT,//payment
}
