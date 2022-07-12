const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const monthShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const ArticleTimeFromDate = (date: Date): string => {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const min = minutes < 10 ? '0' + minutes : minutes;
  const strTime = hours + ':' + min + ' ' + ampm;
  return strTime;
};

export const SectionDateTitle = (date: Date, tod_modifier?: string): string => {
  const DAY = weekday[date.getDay()];
  const MONTH = month[date.getMonth()];
  const DATE = date.getDate().toString();
  const STH = DATE.endsWith('1') ? 'st' : 'th';
  return `${DAY}${tod_modifier ? ' ' + tod_modifier + ', ' : ', '}${MONTH} ${DATE}${STH}`;
};

//<Tab eventKey='oct142022' title='Oct 14-16'>
export const ItineraryShortDateRange = (start_date: Date, end_date: Date): string => {
  const MONTH1 = monthShort[start_date.getMonth()];
  const MONTH2 = monthShort[end_date.getMonth()];
  return `${MONTH1} ${start_date.getDate()} - ${MONTH2 === MONTH1 ? '' : MONTH2 + ' '}${end_date.getDate()}`;
};
