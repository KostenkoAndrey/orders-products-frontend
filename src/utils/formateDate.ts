import { MONTHS_LIST } from '@/constants';

const capitalize = (s: string) =>
  s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

export const formatShortDate = (dateInput: string) => {
  const date = new Date(dateInput);

  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = capitalize(MONTHS_LIST[date.getUTCMonth()]);
  const year = date.getUTCFullYear();

  return `${day} / ${month} / ${year}`;
};

export const formateDate = (date: Date) => {
  const day = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'short' }).toUpperCase();
  const year = date.getFullYear();
  return `${day} ${month}, ${year}`;
};
