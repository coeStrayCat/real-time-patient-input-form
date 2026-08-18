import Badge from "@/components/atoms/Badge";
import StatusDot from "@/components/atoms/StatusDot";

const STATUS_CONFIG = {
  active: { label: "กำลังดำเนินการกรอกแบบฟอร์ม", color: "green" },
  inactive: { label: "ไม่ใช้งาน", color: "amber" },
  submitted: { label: "ส่งแล้ว", color: "indigo" },
};

export default function StatusBadge({ status }) {
  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.inactive;

  return (
    <Badge color={config.color}>
      <StatusDot color={config.color} />
      {config.label}
    </Badge>
  );
}
