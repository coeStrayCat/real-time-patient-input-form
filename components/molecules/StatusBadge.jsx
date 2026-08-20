import Badge from "@/components/atoms/Badge";
import StatusDot from "@/components/atoms/StatusDot";
import CheckIcon from "@/app/assets/icons/circle-check-solid-full.svg";


const STATUS_CONFIG = {
  active: { key: "status.active", color: "green" },
  inactive: { key: "status.inactive", color: "amber" },
  submitted: { key: "status.submitted" },
};

export default function StatusBadge({ status, connected = true, t }) {
  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.inactive;

  const offlineSuffix = !connected && (
    <span className="ml-1 flex items-center gap-1 text-zinc-400">
      <StatusDot color="zinc" />
      {t("status.offlineSuffix")}
    </span>
  );

  if (status === "submitted") {
    return (
      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-green-600">
        <CheckIcon className="h-4 w-4 fill-current" />
        {t(config.key)}
        {offlineSuffix}
      </span>
    );
  }

  return (
    <Badge color={config.color}>
      <StatusDot color={config.color} />
      {t(config.key)}
      {offlineSuffix}
    </Badge>
  );
}
