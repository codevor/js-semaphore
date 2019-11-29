export const eat = ({ actionTimeout, chopsticks }) =>
  new Promise(resolve => {
    setTimeout(() => {
      // release chopsticks
      chopsticks.forEach(chopstick => {
        chopstick.release();
      });

      resolve();
    }, actionTimeout);
  });

export const think = ({ actionTimeout }) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, actionTimeout);
  });
