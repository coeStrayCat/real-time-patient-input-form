"use client";

import { useEffect, useState } from "react";
import SessionListItem from "@/components/molecules/SessionListItem";
import EmptyState from "@/components/molecules/EmptyState";
import Select from "@/components/atoms/Select";
import { useStaffStore } from "@/lib/store/useStaffStore";
import { useTranslate } from "@/lib/i18n/useTranslate";

const STATUS_ORDER = { active: 0, submitted: 1, inactive: 2 };
const FILTERS = ["all", "active", "submitted", "inactive"];

export default function StaffSessionList() {
  const sessions = useStaffStore((state) => state.sessions);
  const selectedId = useStaffStore((state) => state.selectedId);
  const selectSession = useStaffStore((state) => state.selectSession);
  const t = useTranslate();
  const [filter, setFilter] = useState("all");

  const [, forceTick] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => forceTick((n) => n + 1), 15_000);
    return () => clearInterval(interval);
  }, []);

  const filterOptions = FILTERS.map((f) => ({
    value: f,
    label: f === "all" ? t("staff.filterAll") : t(`status.${f}`),
  }));

  const visibleSessions = sessions
    .filter((session) => filter === "all" || session.status === filter)
    .sort((a, b) => {
      const orderDiff = (STATUS_ORDER[a.status] ?? 99) - (STATUS_ORDER[b.status] ?? 99);
      if (orderDiff !== 0) return orderDiff;
      return (b.lastUpdated ?? b.createdAt ?? 0) - (a.lastUpdated ?? a.createdAt ?? 0);
    });

  return (
    <div className="flex flex-col">
      <div className="border-b border-zinc-200 p-2">
        <Select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          options={filterOptions}
        />
      </div>

      {visibleSessions.length === 0 ? (
        <EmptyState>{sessions.length === 0 ? t("staff.noSessions") : t("staff.noMatchingSessions")}</EmptyState>
      ) : (
        <div className="space-y-1 p-2">
          {visibleSessions.map((session) => (
            <SessionListItem
              key={session.patientId}
              session={session}
              active={session.patientId === selectedId}
              onClick={() => selectSession(session.patientId)}
              t={t}
            />
          ))}
        </div>
      )}
    </div>
  );
}
