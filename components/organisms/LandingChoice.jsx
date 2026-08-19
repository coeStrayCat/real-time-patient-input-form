"use client";

import Link from "next/link";
import { useTranslate } from "@/lib/i18n/useTranslate";
import LanguageSwitcher from "@/components/organisms/LanguageSwitcher";

export default function LandingChoice() {
  const t = useTranslate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-zinc-50 px-4 py-12">
      <div className="fixed right-4 top-4 sm:right-6 sm:top-6">
        <LanguageSwitcher />
      </div>

      <div className="text-center">
        <h1 className="text-2xl font-semibold text-zinc-900">{t("landing.title")}</h1>
        <p className="mt-2 text-sm text-zinc-500">{t("landing.subtitle")}</p>
      </div>

      <div className="grid w-full max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
        <Link
          href="/form"
          className="rounded-lg border border-zinc-200 bg-white p-6 text-center shadow-sm transition-colors hover:border-zinc-400 hover:shadow-md"
        >
          <h2 className="text-lg font-semibold text-zinc-900">{t("layout.patientRegistration")}</h2>
          <p className="mt-1 text-sm text-zinc-500">{t("landing.patientDescription")}</p>
        </Link>
        <Link
          href="/staff"
          className="rounded-lg border border-zinc-200 bg-white p-6 text-center shadow-sm transition-colors hover:border-zinc-400 hover:shadow-md"
        >
          <h2 className="text-lg font-semibold text-zinc-900">{t("layout.staffView")}</h2>
          <p className="mt-1 text-sm text-zinc-500">{t("landing.staffDescription")}</p>
        </Link>
      </div>
    </div>
  );
}
