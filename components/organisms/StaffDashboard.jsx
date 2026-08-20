"use client";

import { useEffect } from "react";
import StaffViewLayout from "@/components/templates/StaffViewLayout";
import StaffSessionList from "@/components/organisms/StaffSessionList";
import SessionDetailPanel from "@/components/organisms/SessionDetailPanel";
import StaffViewHeader from "@/components/organisms/StaffViewHeader";
import { useStaffStore } from "@/lib/store/useStaffStore";
import { getSocket } from "@/lib/socket/socketClient";
import { EVENTS } from "@/lib/socket/events";
import { useTranslate } from "@/lib/i18n/useTranslate";
import { formatClockTime } from "@/lib/utils/formatTime";

export default function StaffDashboard() {
  const t = useTranslate();
  const selectedSession = useStaffStore(
    (state) => state.sessions.find((s) => s.patientId === state.selectedId) ?? null,
  );
  const clearSelection = useStaffStore((state) => state.clearSelection);
  const setSessionList = useStaffStore((state) => state.setSessionList);
  const upsertSession = useStaffStore((state) => state.upsertSession);
  const updateSessionFields = useStaffStore((state) => state.updateSessionFields);
  const updateSessionStatus = useStaffStore((state) => state.updateSessionStatus);
  const markSessionSubmitted = useStaffStore((state) => state.markSessionSubmitted);

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
    function handleSessionSubmitted({ patientId, formData, submittedAt }) {
      markSessionSubmitted(patientId, formData, submittedAt);
    }

    socket.on(EVENTS.STAFF_SESSION_LIST, handleSessionList);
    socket.on(EVENTS.SESSION_NEW, handleSessionNew);
    socket.on(EVENTS.SESSION_UPDATE, handleSessionUpdate);
    socket.on(EVENTS.SESSION_STATUS, handleSessionStatus);
    socket.on(EVENTS.SESSION_SUBMITTED, handleSessionSubmitted);

    return () => {
      socket.off(EVENTS.STAFF_SESSION_LIST, handleSessionList);
      socket.off(EVENTS.SESSION_NEW, handleSessionNew);
      socket.off(EVENTS.SESSION_UPDATE, handleSessionUpdate);
      socket.off(EVENTS.SESSION_STATUS, handleSessionStatus);
      socket.off(EVENTS.SESSION_SUBMITTED, handleSessionSubmitted);
    };
  }, [
    setSessionList,
    upsertSession,
    updateSessionFields,
    updateSessionStatus,
    markSessionSubmitted,
  ]);

  return (
    <StaffViewLayout
      header={<StaffViewHeader />}
      hasSelection={Boolean(selectedSession)}
      selectedLabel={
        selectedSession ? t("staff.sessionLabel", formatClockTime(selectedSession.createdAt)) : undefined
      }
      onBack={clearSelection}
      backLabel={t("common.back")}
      list={<StaffSessionList />}
      detail={<SessionDetailPanel />}
    />
  );
}
