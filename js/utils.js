const getRandomIntNumber = function (min, max) {
  if (min >= 0 && max > 0) {
    if (min < max) {
      const result = Math.floor(Math.random() * (max - min + 1)) + min;
      return result;
    }
  }
  return false;
};
getRandomIntNumber();

const getRandomFracNumber = function (min, max, fraction) {
  if (min >= 0 && max > 0) {
    if (min < max) {
      let result = Math.random() * (max - min + 1) + min;
      result = result.toFixed(fraction);
      return +result;
    }
  }
  return false;
};
getRandomFracNumber();

const getRandomElement = (elements) => elements[getRandomIntNumber(0, elements.length - 1)];
getRandomElement();
