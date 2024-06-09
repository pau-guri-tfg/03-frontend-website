export function formatDuration(duration: number): string {
  const gameMinutes = Math.floor(duration / 60);
  const gameSeconds = Math.floor(duration % 60);
  return `${gameMinutes.toString().padStart(2, "0")}:${gameSeconds.toString().padStart(2, "0")}`;
}

export function formatTime(timestamp: number): string {
  const date = new Date(timestamp);
  // format as hour:minutes
  return `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
}

export function formatDate(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleDateString();
}

export function formatDateTime(timestamp: number): string {
  return `${formatDate(timestamp)} ${formatTime(timestamp)}`;
}