export function formatDateTimeFromTimestamp(ts: number | string) {
  const d = new Date(Number(ts));
  if (isNaN(d.getTime())) return String(ts);
  return d.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}