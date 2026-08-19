"use client";

import SessionDetailField from "@/components/molecules/SessionDetailField";
import EmptyState from "@/components/molecules/EmptyState";
import StatusBadge from "@/components/molecules/StatusBadge";
import { useStaffStore } from "@/lib/store/useStaffStore";
import { useTranslate } from "@/lib/i18n/useTranslate";

const FIELD_KEYS = [
  "firstName",
  "middleName",
  "lastName",
  "dateOfBirth",
  "gender",
  "phoneNumber",
  "email",
  "address",
  "preferredLanguage",
  "nationality",
  "religion",
  "emergencyContactName",
  "emergencyContactRelationship",
];

export default function SessionDetailPanel() {
  const session = useStaffStore(
    (state) => state.sessions.find((s) => s.patientId === state.selectedId) ?? null,
  );
  const t = useTranslate();

  if (!session) {
    return <EmptyState>{t("staff.selectSession")}</EmptyState>;
  }

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:max-w-3xl">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-base font-semibold text-zinc-900">{session.label}</h2>
        <StatusBadge status={session.status} connected={session.connected} t={t} />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {FIELD_KEYS.map((key) => (
          <SessionDetailField key={key} label={t(`fields.${key}`)} value={session.fields?.[key]} />
        ))}
      </div>
    </div>
  );
}
