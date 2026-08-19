"use client";

import { useTranslate } from "@/lib/i18n/useTranslate";
import LanguageSwitcher from "@/components/organisms/LanguageSwitcher";
import PatientConnectionStatus from "@/components/organisms/PatientConnectionStatus";

export default function PatientFormHeader() {
  const t = useTranslate();
  return (
    <>
      <h1 className="text-lg font-semibold text-zinc-900">{t("layout.patientRegistration")}</h1>
      <div className="flex items-center gap-3">
        <PatientConnectionStatus />
        <LanguageSwitcher />
      </div>
    </>
  );
}
