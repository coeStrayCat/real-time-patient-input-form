"use client";

import { useState } from "react";
import StaffViewLayout from "@/components/templates/StaffViewLayout";
import StaffSessionList from "@/components/organisms/StaffSessionList";
import SessionDetailPanel from "@/components/organisms/SessionDetailPanel";

const MOCK_SESSIONS = [
  {
    id: "mock-1",
    label: "Patient session — 09:14",
    status: "active",
    lastUpdated: "just now",
    fields: {
      firstName: "Manee",
      lastName: "Jaidee",
      dateOfBirth: "1990-05-12",
      gender: "female",
      phoneNumber: "081-234-5678",
      email: "manee@example.com",
      address: "123 Sukhumvit Rd, Bangkok",
      preferredLanguage: "Thai",
      nationality: "Thai",
    },
  },
  {
    id: "mock-2",
    label: "Patient session — 09:02",
    status: "inactive",
    lastUpdated: "5 min ago",
    fields: {
      firstName: "Somchai",
      lastName: "Srisuk",
      email: "somchai@example.com",
    },
  },
  {
    id: "mock-3",
    label: "Patient session — 08:47",
    status: "submitted",
    lastUpdated: "20 min ago",
    fields: {
      firstName: "Suda",
      lastName: "Wongpech",
      dateOfBirth: "1985-11-02",
      gender: "female",
      phoneNumber: "082-345-6789",
      email: "suda@example.com",
      address: "45 Silom Rd, Bangkok",
      preferredLanguage: "Thai",
      nationality: "Thai",
      religion: "Buddhist",
    },
  },
];

export default function StaffDashboard() {
  const [selectedId, setSelectedId] = useState(null);
  const selectedSession = MOCK_SESSIONS.find((s) => s.id === selectedId) ?? null;

  return (
    <StaffViewLayout
      hasSelection={Boolean(selectedSession)}
      selectedLabel={selectedSession?.label}
      onBack={() => setSelectedId(null)}
      list={
        <StaffSessionList
          sessions={MOCK_SESSIONS}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
      }
      detail={<SessionDetailPanel session={selectedSession} />}
    />
  );
}
