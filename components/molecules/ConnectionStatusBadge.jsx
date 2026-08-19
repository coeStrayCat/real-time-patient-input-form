import Badge from "@/components/atoms/Badge";
import StatusDot from "@/components/atoms/StatusDot";

const STATUS_CONFIG = {
  connected: { key: "connection.connected", color: "green" },
  reconnecting: { key: "connection.reconnecting", color: "amber" },
  offline: { key: "connection.offline", color: "zinc" },
};

export default function ConnectionStatusBadge({ status, t }) {
  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.offline;

  return (
    <Badge color={config.color}>
      <StatusDot color={config.color} />
      {t(config.key)}
    </Badge>
  );
}
