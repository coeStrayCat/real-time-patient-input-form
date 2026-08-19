"use client";

import ConnectionStatusBadge from "@/components/molecules/ConnectionStatusBadge";
import { usePatientStore } from "@/lib/store/usePatientStore";
import { useTranslate } from "@/lib/i18n/useTranslate";

export default function PatientConnectionStatus() {
  const status = usePatientStore((state) => state.connectionStatus);
  const t = useTranslate();
  return <ConnectionStatusBadge status={status} t={t} />;
}
