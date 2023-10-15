import { Socket, io } from "socket.io-client";
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from "../types/socketTypes";
import { BACKEND_URL } from "./config";

export function initializeSocket(
  roomId: string,
  username: string,
  userColor: string | undefined
) {
  let extraHeaders: { [header: string]: string } = {
    room: `${encodeURIComponent(roomId)}`,
    username: username,
  };

  if (userColor) {
    extraHeaders = {
      ...extraHeaders,
      userColor: userColor,
    };
  }

  const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
    `${BACKEND_URL}`,
    {
      extraHeaders: extraHeaders,
    }
  );

  // events provided by socket.io
  socket.on("connect", () => {
    console.log("Connected to the server");
  });

  socket.on("disconnect", () => {
    console.log("Disconnected from the server");
  });

  socket.on("connect_error", (error) => {
    console.log("Connection error:", error);
  });

  socket.on("reconnect", (attemptNumber) => {
    console.log("Reconnected to the server. Attempt:", attemptNumber);
  });

  socket.on("reconnect_error", (error) => {
    console.log("Reconnection error:", error);
  });

  socket.on("reconnect_failed", () => {
    console.log("Failed to reconnect to the server");
  });

  return socket;
}
