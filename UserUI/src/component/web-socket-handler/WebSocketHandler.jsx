import React, { useState, useEffect } from "react";
import Stomp, { client } from "stompjs";
import SockJS from "sockjs-client/dist/sockjs";
import { getBidHistory } from "../../services/apiService";
import axios from "axios";

// const baseURL = "https://jewelry-auction-system.azurewebsites.net/ws";
const baseURL = "http://localhost:8080/ws";

const WebSocketHandler = ({ lotId, setMessage, setBidHistory, setFinancialProofAmount }) => {
  const [messages, setMessages] = useState([]);
  const [stompClient, setStompClient] = useState(null);
  const [connected, setConnected] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem("account"));
  useEffect(() => {
    const socket = new SockJS(baseURL);
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
            .get(
              // `https://jewelry-auction-system.azurewebsites.net/bid/list-bid?lotId=${lotId}`
              `http://localhost:8080/bid/list-bid?lotId=${lotId}`
            )
            .then((result) => {
              setBidHistory(result.data); // Assuming setBidHistory is your state setter
            });
        } catch (error) {
          console.log("Error:", error.message);
        }
      });
      client.subscribe(
        `/topic/financial/member/${currentUser.memberId}`,
        (response) => {
          setFinancialProofAmount(JSON.parse(response.body));
        }
      );
    });

    setStompClient(client);
    return () => {
      if (stompClient) {
        // Check if stompClient is not null before calling disconnect
        stompClient.disconnect();
      }
    };
  }, [setMessage, lotId, setBidHistory, setFinancialProofAmount, currentUser.memberId]);

  return null;
};

export default WebSocketHandler;
