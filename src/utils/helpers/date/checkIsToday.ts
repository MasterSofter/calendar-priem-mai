import { checkDateIsEqual } from './checkDateIsEqual';

export function checkIsToday (date: Date) {
  const today = new Date();
  return checkDateIsEqual(today, date);
};
