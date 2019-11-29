import createTask from './create-task';

const sumTask = ({ semaphore, value, timeoutSeconds = 1 } = {}) =>
  createTask({
    callback: () => {
      return semaphore.acquire().then(() => {
        if (value === 0) {
          return value + 1;
        }
        return value + 10;
      });
    },
    timeoutSeconds
  });

export default sumTask;
