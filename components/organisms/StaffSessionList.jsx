"use client";

import SessionListItem from "@/components/molecules/SessionListItem";
import EmptyState from "@/components/molecules/EmptyState";
import { useStaffStore } from "@/lib/store/useStaffStore";
import { useTranslate } from "@/lib/i18n/useTranslate";

export default function StaffSessionList() {
  const sessions = useStaffStore((state) => state.sessions);
  const selectedId = useStaffStore((state) => state.selectedId);
  const selectSession = useStaffStore((state) => state.selectSession);
  const t = useTranslate();

  if (sessions.length === 0) {
    return <EmptyState>{t("staff.noSessions")}</EmptyState>;
  }

  return (
    <div className="space-y-1 p-2">
      {sessions.map((session) => (
        <SessionListItem
          key={session.patientId}
          session={session}
          active={session.patientId === selectedId}
          onClick={() => selectSession(session.patientId)}
          t={t}
        />
      ))}
    </div>
  );
}
