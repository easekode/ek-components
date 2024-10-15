// Get the current date as a string in the format YYYY-MM-DD
export const getCurrentDateString = (): string => {
  const date = new Date();
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2); // Months are 0 indexed, so +1 and pad with 0 if necessary
  const day = ('0' + date.getDate()).slice(-2); // Pad with 0 if necessary
  return `${year}-${month}-${day}`;
};

// Get the difference in days between two dates
export const getDifferenceInDays = (date1: Date, date2: Date): number => {
  const diffInMs = Math.abs(date2.getTime() - date1.getTime());
  return Math.round(diffInMs / (1000 * 60 * 60 * 24));
};

// Add days to a date
export const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

// Format a date object into a string
export const formatDate = (date: Date, format: string): string => {
  // This is a simple implementation, consider using a library like date-fns for more complex formats
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2); // Months are 0 indexed, so +1 and pad with 0 if necessary
  const day = ('0' + date.getDate()).slice(-2); // Pad with 0 if necessary
  return format
    .replace('YYYY', year.toString())
    .replace('MM', month)
    .replace('DD', day);
};
