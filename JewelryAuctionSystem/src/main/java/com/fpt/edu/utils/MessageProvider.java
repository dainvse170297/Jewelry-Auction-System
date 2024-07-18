package com.fpt.edu.utils;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

public class MessageProvider {

    public static DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");

    public static class ValuationRequestService{
        public static final String valuationRequestSuccessTitle = "Your Valuation Request has been sent";
        public static final String valuationRequestSuccessDescription = "Your valuation request has been sent. Please wait for our response.";

        public static final String productReceivedTitle = "We have received your jewelry";
        public static final String productReceivedMessage = "Your jewelry has been received. We are processing the valuation. We will contact you as soon as your jewelry is evaluated.";

        public static final String preliminaryValuatedTitle = "Your jewelry has been preliminary valuated";
        public static final String preliminaryValuatedMessage = "We have done the preliminary valuation for your jewelry. We will contact you soon.";

        public static final String finalValuatedTitle = "Your jewelry has been valuated";
        public static final String finalValuatedMessage = "We have done the final valuation for your jewelry. Please check your response list for the result.";

        public static final String cancelValuationRequestTitle = "Your valuation request has been canceled";
        public static final String cancelValuationRequestMessage = "Your valuation request has been canceled. Please contact us if you need any further information.";

        public static final String timeoutPreliminaryValuatedTitle = "Your valuation request has been canceled";
        public static final String timeoutPreliminaryValuatedMessage = "Your valuation request has been canceled because it has been preliminary valuated for 30 days. Please contact us if you need any further information.";

    }

    public static class FinancialProofService {
        public static final String financialProofRequestRejectedTitle = "Your Financial Proof Request Has Been Reject ! ";
        public static String financialProofRequestRejectedDescription(LocalDateTime timeRequest) {
            String formattedDateTime = timeRequest.format(formatter);
            return "Your financial proof request sent at  " + formattedDateTime + " has been rejected ! ";
        }

        public static final String financialProofRequestApprovedTitle = "Your Financial Proof Request Has Been Approved ! ";
        public static String financialProofRequestApprovedDescription(LocalDateTime timeRequest) {
            String formattedDateTime = timeRequest.format(formatter);
            return "Congratulations! Your request for financial proof sent at " + formattedDateTime + "  has been approved. You can join our auction right now!";
        }
    }

    public static class BidService{
        public static  String buyNowSuccessTitle(String jewelryName){
            return "You have won the jewelry " + jewelryName;
        }
        public static  String buyNowSuccessDescription(String jewelryName, BigDecimal price){
            return "You have won the jewelry " + jewelryName + " with the price of $" + price + ". Please check your won list for the payment.";
        }


    }

    public static class PaymentService{
        public static final String winnerPaymentSuccessTitle = "Your payment has been successfully";
        public static String winnerPaymentSuccessDescription(List<String> jewelryNames){
            String description = "You have successfully paid for the jewelry: ";
            for (String jewelryName : jewelryNames) {
                description.concat(jewelryName + ", ");
            }
            return description;
        }

        public static final String sellerPaymentSuccessTitle = "We have done the payment for your jewelry";
        public static final String sellerPaymentSuccessDescription = "We have done the payment for your jewelry. Please check your account for the payment.";

        public static final String timeoutWinnerPaymentTitle = "Your payment has been canceled";
        public static final String timeoutWinnerPaymentDescription = "Your payment has been cancelled due to non-payment. Your account is going to be terminated.";

    }


}
