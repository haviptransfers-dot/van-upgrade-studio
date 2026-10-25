// Formats a remaining-seconds count as m:ss for the chat rate-limit countdown.
export const formatCountdown = (totalSeconds: number): string => {
  const s = Math.max(0, Math.floor(totalSeconds));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
};
