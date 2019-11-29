import { SEMAPHORE_TIMESPAN_SECONDS, setTimespan, timespan } from '../src';

const newValue = 0.85;
const newWrongValue = 'test';

describe('timespan.js', () => {
  test('on start, should be the default value `SEMAPHORE_TIMESPAN_SECONDS`', () => {
    expect(timespan()).toBe(SEMAPHORE_TIMESPAN_SECONDS);
  });

  test('on try to set to `newWrongValue`, `timespan()` should be the default value `SEMAPHORE_TIMESPAN_SECONDS`', () => {
    setTimespan(newWrongValue);

    expect(timespan()).not.toBe(newWrongValue);
    expect(timespan()).toBe(SEMAPHORE_TIMESPAN_SECONDS);
  });

  test('on set to `newValue`, `timespan()` should be the new value passed', () => {
    setTimespan(newValue);

    expect(timespan()).not.toBe(SEMAPHORE_TIMESPAN_SECONDS);
    expect(timespan()).toBe(newValue);
  });
});
