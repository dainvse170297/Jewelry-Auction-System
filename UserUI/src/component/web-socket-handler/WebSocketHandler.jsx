import React, { useState, useEffect } from "react";
import Stomp, { client } from "stompjs";
import SockJS from "sockjs-client/dist/sockjs";
import axios from "axios";

const WebSocketHandler = ({ lotId, setMessage, setBidHistory }) => {
  const [messages, setMessages] = useState([]);
  const [stompClient, setStompClient] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const socket = new SockJS("http:/localhost:8080/ws");
    const client = Stomp.over(socket);
    client.connect({}, () => {
      setConnected(true);
      // Also set connected to true when successfully connected
      // Declare subscription before using it
      client.subscribe(`/topic/bids/${lotId}`, (message) => {
        // Assuming the message body is a JSON string that needs to be parsed
        const newMessage = JSON.parse(message.body);
        // Update the messages state with the new message
        //setMessages((prevMessages) => [...prevMessages, newMessage]);
        setMessage(newMessage);
      });
      client.subscribe(`/topic/bids/${lotId}/history`, async () => {
        try {
          await axios
            .get(`http://localhost:8080/bid/list-bid?lotId=${lotId}`) // Ensure `lotId` is defined in your component
            .then((result) => {
              setBidHistory(result.data); // Assuming setBidHistory is your state setter
            });
        } catch (error) {
          console.log("Error:", error.message);
        }
      });
    });

    setStompClient(client);
    return () => {
      if (stompClient) {
        // Check if stompClient is not null before calling disconnect
        stompClient.disconnect();
      }
    };
  }, [setMessage, lotId, setBidHistory]);

  return null;
};

export default WebSocketHandler;