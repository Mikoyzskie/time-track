export function isSameDate(dateString: string): boolean {
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
