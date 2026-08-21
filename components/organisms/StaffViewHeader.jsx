"use client";

import { useRouter } from "next/navigation";
import { useTranslate } from "@/lib/i18n/useTranslate";
import LanguageSwitcher from "@/components/organisms/LanguageSwitcher";
import { getSocket } from "@/lib/socket/socketClient";
import AngleLeftIcon from "@/assets/icons/angle-left-solid-full.svg";

export default function StaffViewHeader({ hasSelection = false }) {
  const t = useTranslate();
  const router = useRouter();

  function handleExit() {
    getSocket().disconnect();
    router.push("/");
  }

  return (
    <>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleExit}
          className={`items-center gap-1 text-sm font-medium text-zinc-600 hover:text-zinc-900 md:flex ${
            hasSelection ? "hidden" : "flex"
          }`}
        >
          <AngleLeftIcon className="h-3 w-3 fill-current" />
          {t("common.back")}
        </button>
        <h1 className="text-lg font-semibold text-zinc-900">{t("layout.staffView")}</h1>
      </div>
      <LanguageSwitcher />
    </>
  );
}
