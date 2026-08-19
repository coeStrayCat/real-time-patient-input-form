import { Server } from "socket.io";
import { EVENTS, SOCKET_PATH, STAFF_ROOM } from "./events.js";
import {
  createOrResumeSession,
  updateFields,
  setConnected,
  findBySocketId,
  listSessions,
  toSummary,
} from "../inMemoryStore.js";

export function attachSocketServer(httpServer) {
  const io = new Server(httpServer, { path: SOCKET_PATH });

  function broadcastToStaff(event, payload) {
    io.to(STAFF_ROOM).emit(event, payload);
  }

  io.on("connection", (socket) => {
    console.log(`[socket] connected: ${socket.id}`);

    socket.on(EVENTS.PATIENT_JOIN, ({ patientId } = {}) => {
      if (!patientId) return;
      const session = createOrResumeSession(patientId, socket.id);
      console.log(`[socket] ${EVENTS.PATIENT_JOIN}`, { socketId: socket.id, patientId });

      broadcastToStaff(EVENTS.SESSION_NEW, { session: toSummary(session) });
    });

    socket.on(EVENTS.PATIENT_FIELD_UPDATE, ({ patientId, fields } = {}) => {
      if (!patientId) return;
      const session = updateFields(patientId, fields);
      if (!session) return;
      broadcastToStaff(EVENTS.SESSION_UPDATE, {
        patientId,
        fields: session.fields,
        status: session.status,
        lastUpdated: session.lastActivityAt,
      });
    });

    socket.on(EVENTS.STAFF_JOIN, () => {
      socket.join(STAFF_ROOM);
      const sessions = listSessions().map(toSummary);
      socket.emit(EVENTS.STAFF_SESSION_LIST, { sessions });
      console.log(`[socket] ${EVENTS.STAFF_JOIN}: ${socket.id} joined "${STAFF_ROOM}"`);
    });

    socket.on("disconnect", (reason) => {
      const session = findBySocketId(socket.id);
      if (session) {
        setConnected(session.patientId, false);
        broadcastToStaff(EVENTS.SESSION_STATUS, {
          patientId: session.patientId,
          status: session.status,
          connected: false,
        });
      }
      console.log(`[socket] disconnected: ${socket.id} (${reason})`);
    });
  });

  return io;
}
