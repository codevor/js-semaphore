const createTask = ({ callback, timeoutSeconds = 1 } = {}) =>
  new Promise(resolve => {
    setTimeout(() => {
      return callback().then(data => {
        resolve(data);
      });
    }, timeoutSeconds * 1000);
  });

export default createTask;
