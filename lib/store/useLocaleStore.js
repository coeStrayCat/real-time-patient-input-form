import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useLocaleStore = create(
  persist(
    (set, get) => ({
      locale: "th",
      setLocale: (locale) => set({ locale }),
      toggleLocale: () => set({ locale: get().locale === "th" ? "en" : "th" }),
    }),
    { name: "locale-storage" },
  ),
);
