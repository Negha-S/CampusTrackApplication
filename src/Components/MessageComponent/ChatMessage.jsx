import React, { useState, useEffect } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { getUserId } from "../../Services/LoginService";
import "./ChatMessage.css";
import { useNavigate } from "react-router-dom";

let stompClient = null;

const ChatMessage = () => {
  const navigate = useNavigate();

  const [connected, setConnected] = useState(false);
  const [username, setUsername] = useState("");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch logged-in user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUserId();
        const userObj = response.data;

        const name =
          userObj.username || userObj.personalName || "User";

        setUsername(name);
        connect(name);
      } catch (error) {
        console.error("User fetch failed:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();

    return () => {
      if (stompClient) {
        stompClient.deactivate();
        stompClient = null;
      }
    };
  }, []);

  // 🔹 Connect WebSocket
  const connect = (name) => {
    if (!name || stompClient?.active) return;

    const socket = new SockJS("http://localhost:9595/lostfound/ws");

    stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,

      onConnect: () => {
        setConnected(true);

        // Register user
        stompClient.publish({
          destination: "/app/register",
          body: JSON.stringify({ sender: name }),
        });

        // Messages
        stompClient.subscribe("/topic/messages", (payload) => {
          setMessages((prev) => [...prev, JSON.parse(payload.body)]);
        });

        // Online users
        stompClient.subscribe("/topic/users", (payload) => {
          setUsers(JSON.parse(payload.body));
        });
      },
    });

    stompClient.activate();
  };

  // 🔹 Send message
  const sendMessage = () => {
    if (!input.trim() || !stompClient?.connected) return;

    stompClient.publish({
      destination: "/app/sendMessage",
      body: JSON.stringify({ sender: username, content: input }),
    });

    setInput("");
  };

  if (loading) {
    return (
      <div className="login-screen">
        <div className="login-card">
          <h2>Loading Chat...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-container">
      {!connected ? (
        <div className="login-screen">
          <div className="login-card">
            <h2>Connecting to Chat...</h2>
          </div>
        </div>
      ) : (
        <div className="chat-room">

          {/* 🔹 SIDEBAR */}
          <div className="sidebar">
            <h3>👥 Online Users</h3>
            <ul>
              {users.length === 0 && <li>No users online</li>}
              {users.map((user, index) => (
                <li key={index} className="user-item">
                  🟢 {user}
                </li>
              ))}
            </ul>
          </div>

          {/* 🔹 CHAT CONTENT */}
          <div className="chat-content">

            {/* HEADER */}
            <div className="chat-header">
              <h4>General Chat</h4>
              <span>{username}</span>
              <button
                className="btn btn-warning"
                onClick={() => navigate("/StudentMenu")}
              >
                Return
              </button>
            </div>

            {/* MESSAGES */}
            <div className="messages">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`message ${
                    m.sender === username ? "self" : "other"
                  }`}
                >
                  <b>{m.sender}:</b> {m.content}
                </div>
              ))}
            </div>

            {/* INPUT */}
            <div className="input-area">
              <input
                type="text"
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button onClick={sendMessage}>Send</button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
