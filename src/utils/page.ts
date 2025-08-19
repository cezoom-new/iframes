export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function formatDateChange(dateString: string) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [year, month, day] = dateString.split("-");
  const formattedDate = `${months[parseInt(month, 10) - 1]} ${parseInt(day, 10)}, ${year}`;

  return formattedDate;
}

export function formatShortDateChange(dateString: string) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const [year, month, day] = dateString.split("-");
  const formattedDate = `${parseInt(day, 10)} ${months[parseInt(month, 10) - 1]} ${year}`;

  return formattedDate;
}
export const formatCustomDate = (dateString: string): string => {
  const date = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
    weekday: "short", // Short weekday (e.g., Tue)
    day: "numeric", // Numeric day (e.g., 9)
    month: "short", // Short month (e.g., May)
    hour: "numeric", // Hour (e.g., 11)
    minute: "numeric", // Minutes (e.g., 30)
    hour12: true, // Use 12-hour format (e.g., am/pm)
  };

  return date.toLocaleString("en-US", options);
};


export function parseBoolean(value: string | null, defaultValue = false): boolean {
  if (value === null) return defaultValue;
  return value.toLowerCase() === "true" || value === "1";
}
