"use client";

import { useMemo } from "react";
import { useLocaleStore } from "@/lib/store/useLocaleStore";
import { translations } from "@/lib/i18n/translations";

function resolve(dict, path) {
  return path.split(".").reduce((acc, key) => (acc == null ? acc : acc[key]), dict);
}

export function useTranslate() {
  const locale = useLocaleStore((state) => state.locale);

  return useMemo(() => {
    return function t(key, ...args) {
      const value = resolve(translations[locale], key) ?? resolve(translations.en, key);
      if (typeof value === "function") return value(...args);
      return value ?? key;
    };
  }, [locale]);
}
