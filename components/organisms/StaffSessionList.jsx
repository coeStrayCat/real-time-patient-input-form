"use client";

import SessionListItem from "@/components/molecules/SessionListItem";
import EmptyState from "@/components/molecules/EmptyState";
import { useStaffStore } from "@/lib/store/useStaffStore";

export default function StaffSessionList() {
  const sessions = useStaffStore((state) => state.sessions);
  const selectedId = useStaffStore((state) => state.selectedId);
  const selectSession = useStaffStore((state) => state.selectSession);

  if (sessions.length === 0) {
    return <EmptyState>ยังไม่มีการให้บริการผู้ป่วยรายใดเลย</EmptyState>;
  }

  return (
    <div className="space-y-1 p-2">
      {sessions.map((session) => (
        <SessionListItem
          key={session.patientId}
          session={session}
          active={session.patientId === selectedId}
          onClick={() => selectSession(session.patientId)}
        />
      ))}
    </div>
  );
}
