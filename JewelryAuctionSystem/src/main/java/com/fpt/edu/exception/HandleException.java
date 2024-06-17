package com.fpt.edu.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class HandleException {

    @ExceptionHandler(RuntimeException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String,String> handleException(Exception e){
        Map<String,String> map = new HashMap<>();
        map.put("message",e.getMessage());
        return map;
    }

    @ExceptionHandler(UsernameExistedException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public Map<String,String> handleUsernameExistedException(Exception e){
        Map<String,String> map = new HashMap<>();
        map.put("message",e.getMessage());
        return map;
    }

    @ExceptionHandler(EmailExistedException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String,String> handleEmailExistedException(Exception e){
        Map<String,String> map = new HashMap<>();
        map.put("message",e.getMessage());
        return map;
    }

    @ExceptionHandler(UsernameNotFoundException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String,String> handleUsernameNotFoundException(Exception e){
        Map<String,String> map = new HashMap<>();
        map.put("message",e.getMessage());
        return map;
    }

    @ExceptionHandler(OutOfFinancialProofAmountException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String,String> handleOutOfFinancialProofAmountException(Exception e){
        Map<String,String> map = new HashMap<>();
        map.put("message",e.getMessage());
        return map;
    }
}
