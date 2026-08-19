import { Server } from "socket.io";

import { EVENTS, SOCKET_PATH, STAFF_ROOM } from "./events.js";

export function attachSocketServer(httpServer) {
  const io = new Server(httpServer, { path: SOCKET_PATH });

  io.on("connection", (socket) => {
    console.log(`[socket] connected: ${socket.id}`);

    socket.on(EVENTS.PATIENT_JOIN, ({ patientId } = {}) => {
      console.log(`[socket] ${EVENTS.PATIENT_JOIN}`, { socketId: socket.id, patientId });
    });

    socket.on(EVENTS.PATIENT_FIELD_UPDATE, ({ patientId, fields, timestamp } = {}) => {
      console.log(`[socket] ${EVENTS.PATIENT_FIELD_UPDATE}`, {
        socketId: socket.id,
        patientId,
        timestamp,
        fields,
      });
    });

    socket.on(EVENTS.STAFF_JOIN, () => {
      socket.join(STAFF_ROOM);
      console.log(`[socket] ${EVENTS.STAFF_JOIN}: ${socket.id} joined "${STAFF_ROOM}"`);
    });

    socket.on("disconnect", (reason) => {
      console.log(`[socket] disconnected: ${socket.id} (${reason})`);
    });
  });

  return io;
}
