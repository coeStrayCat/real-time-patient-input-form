"use client";

import { io } from "socket.io-client";
import { SOCKET_PATH } from "@/lib/socket/events.js";

let socket;

export function getSocket() {
  if (!socket) {
    socket = io({ path: SOCKET_PATH });
  }
  return socket;
}
