import { setStatus, setConnected } from "./inMemoryStore.js";

const INACTIVITY_TIMEOUT_MS = 45_000;
const DISCONNECT_GRACE_MS = 20_000;

const inactivityTimers = new Map();
const disconnectTimers = new Map(); 

export function createStatusEngine({ onStatusChange }) {
  function clearInactivityTimer(patientId) {
    const timer = inactivityTimers.get(patientId);
    if (timer) {
      clearTimeout(timer);
      inactivityTimers.delete(patientId);
    }
  }

  function clearDisconnectTimer(patientId) {
    const timer = disconnectTimers.get(patientId);
    if (timer) {
      clearTimeout(timer);
      disconnectTimers.delete(patientId);
    }
  }

  function noteActivity(patientId) {
    clearInactivityTimer(patientId);
    const timer = setTimeout(() => {
      inactivityTimers.delete(patientId);
      const session = setStatus(patientId, "inactive");
      if (session) onStatusChange(session);
    }, INACTIVITY_TIMEOUT_MS);
    inactivityTimers.set(patientId, timer);
  }

  function noteDisconnect(patientId) {
    clearDisconnectTimer(patientId);
    const timer = setTimeout(() => {
      disconnectTimers.delete(patientId);
      const session = setConnected(patientId, false);
      if (session) onStatusChange(session);
    }, DISCONNECT_GRACE_MS);
    disconnectTimers.set(patientId, timer);
  }

  function noteReconnect(patientId) {
    clearDisconnectTimer(patientId);
  }

  function forceOffline(patientId) {
    clearDisconnectTimer(patientId);
    const session = setConnected(patientId, false);
    if (session) onStatusChange(session);
  }

  function clearAll(patientId) {
    clearInactivityTimer(patientId);
    clearDisconnectTimer(patientId);
  }

  return { noteActivity, noteDisconnect, noteReconnect, forceOffline, clearAll };
}
