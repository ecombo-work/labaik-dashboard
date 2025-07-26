"use client";
import { io, Socket } from "socket.io-client";

const URL = `http://localhost:3001/v1/chat`;

export const socket: Socket = io(URL, {
  transports: ["websocket"],
  withCredentials: true,
  autoConnect: true, 
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});
