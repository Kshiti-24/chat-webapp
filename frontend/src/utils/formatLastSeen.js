export function formatLastSeen(dateString) {
  if (!dateString) return "";

  const date = new Date(dateString);
  const now = new Date();

  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  const isYesterday =
    date.getDate() === now.getDate() - 1 &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  const time = formatTime(date);

  if (isToday) return `last seen today at ${time}`;
  if (isYesterday) return `last seen yesterday at ${time}`;

  return `last seen on ${date.getDate().toString().padStart(2, "0")}/${
    date.getMonth() + 1
  }/${date.getFullYear()} at ${time}`;
}

function formatTime(date) {
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  return `${hours}:${minutes} ${ampm}`;
}
