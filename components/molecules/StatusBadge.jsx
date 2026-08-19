import Badge from "@/components/atoms/Badge";
import StatusDot from "@/components/atoms/StatusDot";

const STATUS_CONFIG = {
  active: { key: "status.active", color: "green" },
  inactive: { key: "status.inactive", color: "amber" },
  submitted: { key: "status.submitted", color: "indigo" },
};

export default function StatusBadge({ status, connected = true, t }) {
  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.inactive;

  return (
    <Badge color={config.color}>
      <StatusDot color={config.color} />
      {t(config.key)}
      {!connected && (
        <span className="ml-1 flex items-center gap-1 text-zinc-400">
          <StatusDot color="zinc" />
          {t("status.offlineSuffix")}
        </span>
      )}
    </Badge>
  );
}
