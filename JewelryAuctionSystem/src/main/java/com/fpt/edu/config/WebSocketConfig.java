package com.fpt.edu.config;

import com.fpt.edu.controller.WebSocketController;
import com.fpt.edu.service.WebSocketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    /**
     * localhost:8080/ws
     */
    @Autowired
    WebSocketService webSocketService;
    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        webSocketController().setSocketService(webSocketService);
        registry.addHandler(webSocketController(), "/ws").setAllowedOrigins("*");
    }

    @Bean
    public WebSocketController webSocketController() {
        return new WebSocketController();
    }
}
