package com.fpt.edu.service;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

public interface IWebSocketService {
    void sendToOne(WebSocketSession webSocketSession, String message) throws Exception;

    void sendToAllClient(Object obj) throws Exception;

    void sendToAll(String message) throws Exception;

    void addSession(WebSocketSession session);

    void removeSession(WebSocketSession session);
}
