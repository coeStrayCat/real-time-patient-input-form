import Badge from "@/components/atoms/Badge";
import StatusDot from "@/components/atoms/StatusDot";
import CheckIcon from "@/app/assets/icons/circle-check-solid-full.svg";

const STATUS_CONFIG = {
  active: { key: "status.active", color: "green" },
  inactive: { key: "status.inactive", color: "amber" },
  submitted: { key: "status.submitted" },
};

export default function StatusBadge({ status, connected = true, t }) {
  if (status !== "submitted" && !connected) {
    return (
      <Badge color="zinc">
        <StatusDot color="zinc" />
        {t("connection.offline")}
      </Badge>
    );
  }

  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.inactive;

  if (status === "submitted") {
    return (
      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-green-600">
        <CheckIcon className="h-4 w-4 fill-current" />
        {t(config.key)}
      </span>
    );
  }

  return (
    <Badge color={config.color}>
      <StatusDot color={config.color} />
      {t(config.key)}
    </Badge>
  );
}
