import { Semaphore } from '../src';
import sumTask from './utils/sum-task';
import subtractTask from './utils/subtract-task';

const TEST_TIMEOUT_SECONDS = 10;

jest.setTimeout(TEST_TIMEOUT_SECONDS * 1000);

describe('semaphore.js', () => {
  let mutex;
  let value;

  const SUM_VALUE = 1;
  const SUBTRACT_VALUE = -1;

  beforeEach(() => {
    mutex = Semaphore();
    value = 0;
  });

  test('new Semaphore should create a defined object', () => {
    expect(mutex).toBeDefined();
  });

  test('new Semaphore should execute first task after acquire', () => {
    const sumPromise = sumTask({
      semaphore: mutex,
      value,
      timeoutSeconds: 0.2
    }).then(summedValue => {
      value = summedValue;
    });

    return sumPromise.then(() => {
      expect(value).toEqual(SUM_VALUE);
    });
  });

  test('blocked Semaphore should wait until `release()` to execute', () => {
    const semaphore = Semaphore({ resources: 1, start: 0 });

    const sumPromise = sumTask({
      semaphore,
      value,
      timeoutSeconds: 0.2
    }).then(summedValue => {
      value = summedValue;
    });

    setTimeout(() => {
      semaphore.release();
    }, 1000);

    return sumPromise.then(() => {
      expect(value).toEqual(SUM_VALUE);
    });
  });

  test('consecutive calls of `release()` doesn`t surpass the max number of resources', () => {
    const semaphore = Semaphore({ resources: 1 });
    // calls to release
    Array.from(new Array(5).keys()).forEach(() => {
      semaphore.release();
    });

    // should block the task
    semaphore.acquire().then(() => {
      setTimeout(() => {
        semaphore.release();
      }, 2000);
    });

    // task
    const sumPromise = sumTask({
      semaphore,
      value,
      timeoutSeconds: 0.2
    }).then(summedValue => {
      value = summedValue;
    });

    return sumPromise.then(() => {
      expect(value).toEqual(SUM_VALUE);
    });
  });

  test('Semaphore of size 1 should behave as Mutex: Be acquired for just one task at time', () => {
    expect(mutex).toBeDefined();

    // execute sum with 0.2s timespan
    const sumPromise = sumTask({
      semaphore: mutex,
      value,
      timeoutSeconds: 0.2
    }).then(summedValue => {
      value = summedValue;

      // wait 0.8s to release
      setTimeout(() => {
        mutex.release();
      }, 800);
    });

    // execute subtract with 0.4s timespan
    const subtractPromise = subtractTask({
      semaphore: mutex,
      value,
      timeoutSeconds: 0.4
    }).then(subtractedValue => {
      value = subtractedValue;
      mutex.release();
    });

    // wait until all promises to resolve
    return Promise.all([sumPromise, subtractPromise]).then(() => {
      expect(value).toEqual(SUBTRACT_VALUE);
    });
  });
});
