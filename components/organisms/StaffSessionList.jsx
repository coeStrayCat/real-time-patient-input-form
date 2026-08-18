import SessionListItem from "@/components/molecules/SessionListItem";
import EmptyState from "@/components/molecules/EmptyState";

export default function StaffSessionList({ sessions, selectedId, onSelect }) {
  if (sessions.length === 0) {
    return <EmptyState>ยังไม่มีการให้บริการผู้ป่วยรายใดเลย</EmptyState>;
  }

  return (
    <div className="space-y-1 p-2">
      {sessions.map((session) => (
        <SessionListItem
          key={session.id}
          session={session}
          active={session.id === selectedId}
          onClick={() => onSelect(session.id)}
        />
      ))}
    </div>
  );
}
