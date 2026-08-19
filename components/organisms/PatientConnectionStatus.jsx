"use client";

import ConnectionStatusBadge from "@/components/molecules/ConnectionStatusBadge";
import { usePatientStore } from "@/lib/store/usePatientStore";

export default function PatientConnectionStatus() {
  const status = usePatientStore((state) => state.connectionStatus);
  return <ConnectionStatusBadge status={status} />;
}
