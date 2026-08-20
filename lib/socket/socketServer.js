import { Server } from "socket.io";

import { EVENTS, SOCKET_PATH, STAFF_ROOM } from "./events.js";
import {
  createOrResumeSession,
  updateFields,
  markSubmitted,
  findBySocketId,
  listSessions,
  toSummary,
} from "../inMemoryStore.js";
import { createStatusEngine } from "../statusEngine.js";
import { validatePatientForm } from "../validation/patientFormSchema.js";

export function attachSocketServer(httpServer) {
  const io = new Server(httpServer, { path: SOCKET_PATH });

  function broadcastToStaff(event, payload) {
    io.to(STAFF_ROOM).emit(event, payload);
  }

  const statusEngine = createStatusEngine({
    onStatusChange: (session) =>
      broadcastToStaff(EVENTS.SESSION_STATUS, {
        patientId: session.patientId,
        status: session.status,
        connected: session.connected,
      }),
  });

  io.on("connection", (socket) => {
    console.log(`[socket] connected: ${socket.id}`);

    socket.on(EVENTS.PATIENT_JOIN, ({ patientId } = {}) => {
      if (!patientId) return;
      const session = createOrResumeSession(patientId, socket.id);
      statusEngine.noteReconnect(patientId);
      statusEngine.noteActivity(patientId);
      console.log(`[socket] ${EVENTS.PATIENT_JOIN}`, { socketId: socket.id, patientId });
      broadcastToStaff(EVENTS.SESSION_NEW, { session: toSummary(session) });
    });

    socket.on(EVENTS.PATIENT_FIELD_UPDATE, ({ patientId, fields } = {}) => {
      if (!patientId) return;
      const session = updateFields(patientId, fields);
      if (!session) return;
      statusEngine.noteActivity(patientId);
      broadcastToStaff(EVENTS.SESSION_UPDATE, {
        patientId,
        fields: session.fields,
        status: session.status,
        lastUpdated: session.lastActivityAt,
      });
    });

    socket.on(EVENTS.PATIENT_SUBMIT, ({ patientId, formData } = {}, ack) => {
      const reply = typeof ack === "function" ? ack : () => {};
      if (!patientId) {
        reply({ success: false, errors: {} });
        return;
      }

      const result = validatePatientForm(formData);
      if (!result.success) {
        reply({ success: false, errors: result.errors });
        return;
      }

      updateFields(patientId, result.data);
      const session = markSubmitted(patientId);
      if (!session) {
        reply({ success: false, errors: {} });
        return;
      }
      statusEngine.clearAll(patientId); 

      reply({ success: true });
      broadcastToStaff(EVENTS.SESSION_SUBMITTED, {
        patientId,
        formData: session.fields,
        submittedAt: session.submittedAt,
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
        if (reason === "client namespace disconnect") {
          statusEngine.forceOffline(session.patientId);
        } else {
          statusEngine.noteDisconnect(session.patientId);
        }
      }
      console.log(`[socket] disconnected: ${socket.id} (${reason})`);
    });
  });

  return io;
}
