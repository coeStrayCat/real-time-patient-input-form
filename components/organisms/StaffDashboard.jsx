"use client";

import { useEffect } from "react";
import StaffViewLayout from "@/components/templates/StaffViewLayout";
import StaffSessionList from "@/components/organisms/StaffSessionList";
import SessionDetailPanel from "@/components/organisms/SessionDetailPanel";
import { useStaffStore } from "@/lib/store/useStaffStore";
import { getSocket } from "@/lib/socket/socketClient";
import { EVENTS } from "@/lib/socket/events";

export default function StaffDashboard() {
  const selectedSession = useStaffStore(
    (state) => state.sessions.find((s) => s.patientId === state.selectedId) ?? null,
  );
  const clearSelection = useStaffStore((state) => state.clearSelection);
  const setSessionList = useStaffStore((state) => state.setSessionList);
  const upsertSession = useStaffStore((state) => state.upsertSession);
  const updateSessionFields = useStaffStore((state) => state.updateSessionFields);
  const updateSessionStatus = useStaffStore((state) => state.updateSessionStatus);

  useEffect(() => {
    const socket = getSocket();
    socket.emit(EVENTS.STAFF_JOIN);

    function handleSessionList({ sessions }) {
      setSessionList(sessions);
    }
    function handleSessionNew({ session }) {
      upsertSession(session);
    }
    function handleSessionUpdate({ patientId, fields, status, lastUpdated }) {
      updateSessionFields(patientId, fields, status, lastUpdated);
    }
    function handleSessionStatus({ patientId, status, connected }) {
      updateSessionStatus(patientId, status, connected);
    }

    socket.on(EVENTS.STAFF_SESSION_LIST, handleSessionList);
    socket.on(EVENTS.SESSION_NEW, handleSessionNew);
    socket.on(EVENTS.SESSION_UPDATE, handleSessionUpdate);
    socket.on(EVENTS.SESSION_STATUS, handleSessionStatus);

    return () => {
      socket.off(EVENTS.STAFF_SESSION_LIST, handleSessionList);
      socket.off(EVENTS.SESSION_NEW, handleSessionNew);
      socket.off(EVENTS.SESSION_UPDATE, handleSessionUpdate);
      socket.off(EVENTS.SESSION_STATUS, handleSessionStatus);
    };
  }, [setSessionList, upsertSession, updateSessionFields, updateSessionStatus]);

  return (
    <StaffViewLayout
      hasSelection={Boolean(selectedSession)}
      selectedLabel={selectedSession?.label}
      onBack={clearSelection}
      list={<StaffSessionList />}
      detail={<SessionDetailPanel />}
    />
  );
}
