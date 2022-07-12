import debugLib from 'debug';
const debug = debugLib('eventsapp:query-utils');

/**
 * Convert a string representing a date into a Date object
 *
 * @param str - Timestamp/date string to covnert into a Date object
 * @returns date from string or current date if error
 */
export const StringToDate = (str: string): Date => {
  if (!str.endsWith('Z')) {
    str = `${str}Z`;
  }
  const date = new Date(str);
  if (date && date !== null) {
    return date;
  }
  debug(`Unable to convert ${str} into Date. Returning current date.`);
  return new Date();
};
