import { DateTime } from 'luxon';

/**
 * Formats a given ISO date string to a human-readable format.
 * @param isoDate - The ISO date string.
 * @param format - The format for the date.
 * @returns The formatted date string or 'N/A' if date is invalid.
 */

export const formatDate = (isoDate: string | null | undefined | Date, format: string = DateTime.DATETIME_MED): string => {
  if (!isoDate) return 'N/A';
  return DateTime.fromISO(isoDate).toLocaleString(format);
};