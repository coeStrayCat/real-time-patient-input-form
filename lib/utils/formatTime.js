
export function formatRelativeTime(timestamp, t) {
  if (!timestamp) return "";

  const diffSec = Math.round((Date.now() - timestamp) / 1000);
  if (diffSec < 5) return t("time.justNow");
  if (diffSec < 60) return t("time.secAgo", diffSec);

  const diffMin = Math.round(diffSec / 60);
  if (diffMin < 60) return t("time.minAgo", diffMin);

  const diffHour = Math.round(diffMin / 60);
  return t("time.hrAgo", diffHour);
}

export function formatClockTime(timestamp) {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  const hh = String(date.getHours()).padStart(2, "0");
  const mm = String(date.getMinutes()).padStart(2, "0");
  return `${hh}:${mm}`;
}
