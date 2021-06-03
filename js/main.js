/* eslint-disable no-console */
/* eslint-disable prefer-template */
const getRandomIntNumber = function (min, max) {
  if (min >= 0 && max > 0) {
    if (min < max) {
      const result = Math.floor(Math.random() * (max - min + 1)) + min;
      console.log('случайное целое число из диапазона ' + result);
      return result;
    }
  }
  return console.log('диапазон задан неверно');
};
getRandomIntNumber(0, 6);


const getRandomFracNumber = function (min, max, fraction) {
  if (min >= 0 && max > 0) {
    if (min < max) {
      let result = Math.random() * (max - min + 1) + min;
      result = result.toFixed(fraction);
      console.log('случайное дробное число из диапазона с ' + fraction + ' цифрами после запятой ' + result);
      return result;
    }
  }
  return console.log('диапазон задан неверно');
};
getRandomFracNumber(1.115, 3.457, 2);
