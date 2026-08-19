"use client";

const STORAGE_KEY = "patient-id";

export function getOrCreatePatientId() {
  if (typeof window === "undefined") return null;

  let id = window.localStorage.getItem(STORAGE_KEY);
  if (!id) {
    id = crypto.randomUUID();
    window.localStorage.setItem(STORAGE_KEY, id);
  }
  return id;
}
