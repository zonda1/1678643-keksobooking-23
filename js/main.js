/* eslint-disable no-console */
/* eslint-disable prefer-template */
const getRandomIntNumber = function (min, max) {
  while (min >= 0 && max > 0) {
    const result = Math.floor(Math.random() * (max - min + 1)) + min;
    if (min < max) {
      console.log('случайное целое число из диапазона ' + result);
      return result;
    } else {
      console.log('диапазон задан неверно');
      return result;
    }
  }
  console.log('диапазон должен быть положительным');
};
getRandomIntNumber(2, 6);


const getRandomFracNumber = function (min, max, fraction) {
  const result = Math.random() * (max - min + 1) + min;
  while (min >= 0 && max > 0) {
    if (min < max) {
      console.log('случайное дробное число из диапазона с ' + fraction + ' цифрами после запятой ' + result.toFixed(fraction));
      return result;
    } else {
      console.log('диапазон задан неверно');
      return result;
    }
  }
  console.log('диапазон должен быть положительным');
};
getRandomFracNumber(3.115, 5.457, 3);
