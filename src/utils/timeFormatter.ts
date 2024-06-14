import moment from "moment";

export function formatDuration(duration: number): string {
  const gameMinutes = Math.floor(duration / 60);
  const gameSeconds = Math.floor(duration % 60);
  return `${gameMinutes.toString().padStart(2, "0")}:${gameSeconds.toString().padStart(2, "0")}`;
}

export function formatTime(timestamp: number): string {
  return moment(timestamp).format("HH:mm");
}

export function formatDate(timestamp: number): string {
  return moment(timestamp).format("DD/MM/YYYY");
}

export function formatDateTime(timestamp: number): string {
  return moment(timestamp).format("DD/MM/YYYY HH:mm");
}