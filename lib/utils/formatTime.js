
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
