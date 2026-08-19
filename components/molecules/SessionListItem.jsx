import StatusBadge from "@/components/molecules/StatusBadge";
import { formatRelativeTime } from "@/lib/utils/formatTime";

export default function SessionListItem({ session, active = false, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-patient-id={session.patientId}
      className={`flex w-full flex-col gap-1 rounded-md border px-3 py-2 text-left transition-colors ${
        active ? "border-zinc-900 bg-zinc-50" : "border-transparent hover:bg-zinc-50"
      }`}
    >
      <span className="text-sm font-medium text-zinc-900">{session.label}</span>
      <span className="flex items-center justify-between gap-2">
        <StatusBadge status={session.status} connected={session.connected} />
        <span className="text-xs text-zinc-400">{formatRelativeTime(session.lastUpdated)}</span>
      </span>
    </button>
  );
}
