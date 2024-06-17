package com.fpt.edu.exception;

public class OutOfFinancialProofAmountException extends RuntimeException {
    public OutOfFinancialProofAmountException(String message) {
        super(message);
    }
}
