import isValidNumber from './is-valid-number';
import { SEMAPHORE_TIMESPAN_SECONDS } from '../constants/semaphore-timespan-seconds';

let userTimespan;

export const timespan = () =>
  isValidNumber(userTimespan) ? userTimespan : SEMAPHORE_TIMESPAN_SECONDS;

export const setTimespan = value => {
  if (isValidNumber(value)) {
    userTimespan = value;
  }
};
