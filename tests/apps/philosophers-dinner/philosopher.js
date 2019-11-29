import { getChopsticksIndex, getChopstick } from './chopstick';
import { eat, think } from './actions';

const philosopher = ({ index, entitiesCount, chopsticks }) => () =>
  new Promise(resolve => {
    const [firstChopstickIndex, secondChopstickIndex] = getChopsticksIndex({
      index,
      entitiesCount
    });

    return getChopstick(chopsticks[firstChopstickIndex]).then(() => {
      return getChopstick(chopsticks[secondChopstickIndex]).then(() => {
        const ACTION_TIMEOUT = 200 + index * 100;
        eat({
          actionTimeout: ACTION_TIMEOUT,
          chopsticks: [
            chopsticks[firstChopstickIndex],
            chopsticks[secondChopstickIndex]
          ]
        }).then(() => {
          think({ actionTimeout: ACTION_TIMEOUT }).then(() => {
            resolve(index + 1);
          });
        });
      });
    });
  });

export default philosopher;
