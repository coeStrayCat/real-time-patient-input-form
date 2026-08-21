"use client";

import SessionDetailField from "@/components/molecules/SessionDetailField";
import EmptyState from "@/components/molecules/EmptyState";
import StatusBadge from "@/components/molecules/StatusBadge";
import UserIcon from "@/assets/icons/user-solid-full.svg";
import { useStaffStore } from "@/lib/store/useStaffStore";
import { useTranslate } from "@/lib/i18n/useTranslate";
import { formatClockTime } from "@/lib/utils/formatTime";

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
      <div className="grid-cols-1 sm:flex items-center justify-between gap-2">
        <h2 className="flex items-center gap-1.5 text-base font-semibold text-zinc-900">
          <UserIcon className="h-4 w-4 shrink-0 fill-current text-zinc-400" />
          {t("staff.sessionLabel", formatClockTime(session.createdAt))}
        </h2>
        <StatusBadge status={session.status} connected={session.connected} t={t} />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {FIELD_KEYS.map((key) => (
          <SessionDetailField
            key={`${session.patientId}-${key}`}
            label={t(`fields.${key}`)}
            value={session.fields?.[key]}
          />
        ))}
      </div>
    </div>
  );
}
