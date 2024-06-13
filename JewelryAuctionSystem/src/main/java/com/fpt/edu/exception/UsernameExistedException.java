package com.fpt.edu.exception;

public class UsernameExistedException extends RuntimeException {
    public UsernameExistedException(String message) {
        super(message);
    }
}
