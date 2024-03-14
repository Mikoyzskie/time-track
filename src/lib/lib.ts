export function isToday(dateString: string): boolean {
  // Convert the provided date string to a Date object
  const providedDate = new Date(dateString);

  // Get the current date
  const currentDate = new Date();

  // Check if the year, month, and day of the provided date match the current date
  return (
    providedDate.getFullYear() === currentDate.getFullYear() &&
    providedDate.getMonth() === currentDate.getMonth() &&
    providedDate.getDate() === currentDate.getDate()
  );
}

export function time(data: Date | null) {
  if (data !== null) {
    let hours = data.getHours();
    const minutes = data.getMinutes();
    const amOrPm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedTime =
      hours.toString().padStart(2, "0") +
      ":" +
      minutes.toString().padStart(2, "0") +
      ":" +
      amOrPm;
    return formattedTime;
  }
  return "--:-- --";
}
