export const getChopsticksIndex = ({ index, entitiesCount }) => {
  if (index !== entitiesCount - 1) {
    return [index, index + 1];
  }
  return [0, index];
};

export const getChopstick = chopstick => {
  return chopstick.acquire();
};
