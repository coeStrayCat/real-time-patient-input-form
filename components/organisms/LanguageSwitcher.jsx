"use client";

import { useEffect } from "react";
import LanguageToggle from "@/components/molecules/LanguageToggle";
import { useLocaleStore } from "@/lib/store/useLocaleStore";

export default function LanguageSwitcher() {
  const locale = useLocaleStore((state) => state.locale);
  const setLocale = useLocaleStore((state) => state.setLocale);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return <LanguageToggle locale={locale} onSelect={setLocale} />;
}
