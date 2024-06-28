import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

// Make sure global is available
if (typeof global === "undefined") {
    window.global = window;
}

export { Client, SockJS };