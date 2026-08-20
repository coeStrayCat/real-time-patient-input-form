const sessions = new Map();

export function createOrResumeSession(patientId, socketId) {
  let session = sessions.get(patientId);
  if (!session) {
    session = {
      patientId,
      createdAt: Date.now(),
      lastActivityAt: Date.now(),
      connected: true,
      status: "inactive",
      submitted: false,
      submittedAt: null,
      fields: {},
      socketId,
    };
    sessions.set(patientId, session);
  } else {
    session.connected = true;
    session.socketId = socketId;
  }
  return session;
}

export function updateFields(patientId, fields) {
  const session = sessions.get(patientId);
  if (!session) return null;

  session.fields = { ...session.fields, ...fields };
  session.lastActivityAt = Date.now();
  
  if (!session.submitted) {
    session.status = "active";
  }
  return session;
}

export function setStatus(patientId, status) {
  const session = sessions.get(patientId);
  if (!session || session.submitted) return null; 
  session.status = status;
  return session;
}

export function markSubmitted(patientId) {
  const session = sessions.get(patientId);
  if (!session) return null;
  session.submitted = true;
  session.submittedAt = Date.now();
  session.status = "submitted";
  return session;
}

export function setConnected(patientId, connected) {
  const session = sessions.get(patientId);
  if (!session) return null;
  session.connected = connected;
  return session;
}

export function findBySocketId(socketId) {
  for (const session of sessions.values()) {
    if (session.socketId === socketId) return session;
  }
  return null;
}

export function listSessions() {
  return Array.from(sessions.values());
}


export function toSummary(session) {
  const { socketId: _socketId, ...summary } = session;
  return summary;
}
