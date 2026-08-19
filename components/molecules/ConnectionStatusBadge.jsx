import Badge from "@/components/atoms/Badge";
import StatusDot from "@/components/atoms/StatusDot";

const STATUS_CONFIG = {
  connected: { label: "เชื่อมต่อแล้ว", color: "green" },
  reconnecting: { label: "กำลังเชื่อมต่อใหม่...", color: "amber" },
  offline: { label: "ออฟไลน์", color: "zinc" },
};

export default function ConnectionStatusBadge({ status }) {
  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.offline;

  return (
    <Badge color={config.color}>
      <StatusDot color={config.color} />
      {config.label}
    </Badge>
  );
}
