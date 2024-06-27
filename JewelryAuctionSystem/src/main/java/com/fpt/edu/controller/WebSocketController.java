package com.fpt.edu.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.fpt.edu.service.IWebSocketService;
import com.fpt.edu.service.WebSocketService;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@Controller
public class WebSocketController extends TextWebSocketHandler {
    private IWebSocketService socketService;
    ObjectMapper objectMapper = new ObjectMapper().registerModule(new JavaTimeModule());

    public void setSocketService(WebSocketService webSocketService) {
        this.socketService = webSocketService;
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        socketService.addSession(session);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        socketService.removeSession(session);
    }

    private <T> T convertPayload(Object object, Class<T> type) {
        T t = null;
        try {
            t = objectMapper.readValue(objectMapper.writeValueAsString(object), type);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return t;
    }
}
