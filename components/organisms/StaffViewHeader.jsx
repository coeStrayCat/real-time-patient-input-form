"use client";

import { useTranslate } from "@/lib/i18n/useTranslate";
import LanguageSwitcher from "@/components/organisms/LanguageSwitcher";

export default function StaffViewHeader() {
  const t = useTranslate();
  return (
    <>
      <h1 className="text-lg font-semibold text-zinc-900">{t("layout.staffView")}</h1>
      <LanguageSwitcher />
    </>
  );
}
