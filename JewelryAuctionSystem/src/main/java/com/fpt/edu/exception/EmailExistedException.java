package com.fpt.edu.exception;

public class EmailExistedException extends RuntimeException {
    public EmailExistedException(String message) {
        super(message);
    }
}
