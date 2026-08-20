import StatusBadge from "@/components/molecules/StatusBadge";
import { formatRelativeTime, formatClockTime } from "@/lib/utils/formatTime";

function getDisplayName(fields) {
  const parts = [fields?.firstName, fields?.middleName, fields?.lastName].filter(Boolean);
  return parts.length > 0 ? parts.join(" ") : null;
}

export default function SessionListItem({ session, active = false, onClick, t }) {
  const displayName = getDisplayName(session.fields);

  return (
    <button
      type="button"
      onClick={onClick}
      data-patient-id={session.patientId}
      className={`flex w-full flex-col gap-1 rounded-md border px-3 py-2 text-left transition-colors ${
        active ? "border-zinc-900 bg-zinc-50" : "border-transparent hover:bg-zinc-50"
      }`}
    >
      <span className="text-sm font-medium text-zinc-900">
        {displayName ?? t("staff.sessionLabel", formatClockTime(session.createdAt))}
      </span>
      <span className="flex items-center justify-between gap-2">
        <StatusBadge status={session.status} connected={session.connected} t={t} />
        <span className="text-xs text-zinc-400">{formatRelativeTime(session.lastUpdated, t)}</span>
      </span>
    </button>
  );
}
