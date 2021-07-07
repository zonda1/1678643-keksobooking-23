/* eslint-disable id-length */
const ALERT_SHOW_TIME = 5000;

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

const getDeclension = function (num,obj) {

  if (num % 10===1 && num % 100!==11) {
    return obj.one;
  }
  if (num % 10>=2 && num % 10 <= 4) {
    return obj.several;
  }
  return obj.many;
};

const resetDisabled=(obj)=> {
  for (let i=0;i<obj.length;i++) {
    obj[i].removeAttribute('disabled');
  }
};

const isEscEvent = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc';
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export {getRandomIntNumber,getRandomFracNumber,getRandomElement,getDeclension,resetDisabled,isEscEvent,showAlert};
