import { Semaphore } from '../../src';
import philosopher from './philosophers-dinner/philosopher';

const ENTITIES_COUNT = 5;
const PHILOSOPHERS_ACTIONS_COUT = 3;

const TEST_TIMEOUT_SECONDS = 20;

jest.setTimeout(TEST_TIMEOUT_SECONDS * 1000);

describe('app/philosophers-dinner', () => {
  test('run philosophers dinner', () => {
    const entities = Array.from(new Array(ENTITIES_COUNT).keys());
    const actionTimes = Array.from(new Array(PHILOSOPHERS_ACTIONS_COUT).keys());

    const chopsticks = entities.map(() => {
      return Semaphore({ resources: 1, start: 0 });
    }, []);

    const philosophers = entities.map(entityIndex => {
      return philosopher({
        index: entityIndex,
        entitiesCount: ENTITIES_COUNT,
        chopsticks
      });
    }, []);

    const philosophersPromises = actionTimes.reduce(acc => {
      return [
        ...acc,
        ...philosophers.map(philosopherItem => {
          return philosopherItem();
        })
      ];
    }, []);

    chopsticks.forEach(chopstick => {
      chopstick.release();
    });

    return Promise.all(philosophersPromises).then(data => {
      expect(data.length).toEqual(ENTITIES_COUNT * PHILOSOPHERS_ACTIONS_COUT);

      data.forEach(value => {
        expect(value).toBeGreaterThanOrEqual(1);
      });
    });
  });
});
