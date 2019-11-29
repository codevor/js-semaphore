import { timespan } from './utils/timespan';

const Semaphore = ({ resources = 1, start = resources } = {}) => {
  let counter = start >= resources ? resources : start;

  const acquire = () => {
    if (counter > 0) {
      counter -= 1;
      return Promise.resolve();
    }

    return new Promise(resolve => {
      setTimeout(() => {
        acquire().then(() => {
          resolve();
        });
      }, timespan() * 1000);
    });
  };

  const release = () => {
    if (counter < resources) {
      counter += 1;
    }
  };

  return {
    acquire,
    release
  };
};

export default Semaphore;
