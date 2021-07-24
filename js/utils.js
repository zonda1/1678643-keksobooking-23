const ALERT_SHOW_TIME = 5000;

const getDeclension = function (num,obj) {

  if (num % 10===1 && num % 100!==11) {
    return obj.one;
  }
  if (num % 10>=2 && num % 100 < 4) {
    return obj.several;
  }
  if (num===4) {
    return obj.several;
  }
  return obj.many;
};

const resetDisabled=(obj)=> {
  for (let ind=0; ind < obj.length; ind++) {
    obj[ind].removeAttribute('disabled');
  }
};

const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';


const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
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

export {getDeclension,resetDisabled,isEscEvent,showAlert};
