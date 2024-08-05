export const API_BASE = "https://interview.switcheo.com/prices.json";
export const inputGroupClassNames = "sm:flex sm:gap-2 space-y-2 sm:space-y-0";
export function getDate(date: string) {
  const convertedDate = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short",
  };

  return convertedDate.toLocaleDateString("en-US", options);
}
