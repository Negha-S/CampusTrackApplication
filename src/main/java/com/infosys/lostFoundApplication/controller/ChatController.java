package com.infosys.lostFoundApplication.controller;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.infosys.lostFoundApplication.bean.ChatMessage;

@CrossOrigin
@RestController
@RequestMapping("/lostfound/")
public class ChatController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    // username -> number of active sessions
    private final Map<String, Integer> userSessionCount =
            Collections.synchronizedMap(new HashMap<>());

    // sessionId -> username
    private final Map<String, String> sessionIdToUser =
            Collections.synchronizedMap(new HashMap<>());

    // REST API (optional)
    @GetMapping("/users")
    public Set<String> getOnlineUsers() {
        return userSessionCount.keySet();
    }

    // REGISTER USER
    @MessageMapping("/register")
    public void registerUser(ChatMessage message,
                             StompHeaderAccessor headerAccessor) {

        String sessionId = headerAccessor.getSessionId();
        String username = message.getSender();

        if (username == null || username.trim().isEmpty()) {
            return;
        }

        sessionIdToUser.put(sessionId, username);

        userSessionCount.put(
                username,
                userSessionCount.getOrDefault(username, 0) + 1
        );

        broadcastUserList();
    }

    // SEND MESSAGE
    @MessageMapping("/sendMessage")
    public void sendMessage(ChatMessage message) {
        messagingTemplate.convertAndSend("/topic/messages", message);
    }

    // REMOVE USER ON DISCONNECT
    public void removeUser(String sessionId) {

        String username = sessionIdToUser.remove(sessionId);

        if (username != null) {
            int count = userSessionCount.getOrDefault(username, 0) - 1;

            if (count <= 0) {
                userSessionCount.remove(username);
            } else {
                userSessionCount.put(username, count);
            }

            broadcastUserList();
        }
    }

    // BROADCAST ONLINE USERS
    private void broadcastUserList() {
        messagingTemplate.convertAndSend(
                "/topic/users",
                userSessionCount.keySet()
        );
    }
}
