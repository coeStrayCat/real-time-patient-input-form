
export const EVENTS = {
  // patient -> server แปะไว้ก่อนเดียวลืม
  PATIENT_JOIN: "patient:join", //ได้ { patientId }
  PATIENT_FIELD_UPDATE: "patient:field_update", //ได้ { patientId, fields, timestamp }
  PATIENT_SUBMIT: "patient:submit", //ได้ { patientId, formData } (+ ack callback)
  
  STAFF_JOIN: "staff:join", //ได้ {}
  STAFF_SESSION_LIST: "staff:session_list", //ได้ { sessions }
  SESSION_NEW: "session:new", //ได้ { session }
  SESSION_UPDATE: "session:update", //ได้ { patientId, fields, lastUpdated }
  SESSION_STATUS: "session:status", //ได้ { patientId, status, connected }
  SESSION_SUBMITTED: "session:submitted", //ได้ { patientId, formData, submittedAt }
  SESSION_REMOVED: "session:removed", //ได้ { patientId }
};

export const SOCKET_PATH = "/socket.io";
export const STAFF_ROOM = "staff";
