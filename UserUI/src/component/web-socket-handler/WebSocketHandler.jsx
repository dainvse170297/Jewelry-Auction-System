import React, { useState, useEffect } from "react";
import Stomp, { client } from "stompjs";
import SockJS from "sockjs-client/dist/sockjs";

const WebSocketHandler = ({ lotId }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [stompClient, setStompClient] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const socket = new SockJS("http:/localhost:8080/ws");
    const client = Stomp.over(socket);
    client.connect({}, () => {
      setConnected(true); // Also set connected to true when successfully connected
      // Declare subscription before using it
      let subscription = client.subscribe(`/topic/bids/${lotId}`, (message) => {
        // Assuming the message body is a JSON string that needs to be parsed
        const newMessage = JSON.parse(message.body);
        // Update the messages state with the new message
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });
    });

    setStompClient(client);
    return () => {
      if (stompClient) {
        // Check if stompClient is not null before calling disconnect
        stompClient.disconnect();
      }
    };
  }, []);

  return (
    <div>
      <h1>WebSocket Example</h1>
      <h2>Connected: {stompClient ? "Yes" : "No"}</h2>
      <h3>Messages: </h3>
      <ul>
        {messages.map((msg, index) => (
          <div>
            <p>Bid ID: ${msg.bidId}</p>
            <p>Member ID: ${msg.memberId}</p>
            <p>Lot ID: ${msg.lotId}</p>
            <p>Member Name: ${msg.memberName}</p>
            <p>Price: ${msg.price}</p>
            <p>Bid Time: ${msg.bidTime}</p>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default WebSocketHandler;
