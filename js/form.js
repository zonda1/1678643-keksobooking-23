import {getDeclension,resetDisabled,isEscEvent} from './utils.js';
import {sendOffer} from './fetch.js';
import {DEFAULT_MAIN_POSITION, marker,drawOnMap} from './map.js';
import { mapFilters,getFilteredAdArray} from './filter.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE_VALUE = 1000000;

const SYMBOLS_DICT={
  one: 'символ',
  several:'символа',
  many:'символов',
};

const PRICE_DEPEND_ON_TYPE={
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};

const GUESTS_TO_ROOMS = {
  '1': [1],
  '2': [1, 2],
  '3': [1, 2, 3],
  '100': [0],
};


const offerForm=document.querySelector('.ad-form');
const offerAddFormElement=offerForm.querySelectorAll('.ad-form__element');

const sendWithSuccess=document.querySelector('#success').content.querySelector('.success');
const showSuccess=sendWithSuccess.cloneNode(true);

const sendWithError=document.querySelector('#error').content.querySelector('.error');
const showError=sendWithError.cloneNode(true);
const closeMessageWithError=showError.querySelector('.error__button');

const formAddressInput=offerForm.querySelector('input[name="address"]');
const resetButton=offerForm.querySelector('.ad-form__reset');

const formTitleInput = document.querySelector('input[name="title"]');
const formPriceInput = document.querySelector('input[name="price"]');
const formRoomsSelect = document.querySelector('select[name="rooms"]');
const formRoomsOptions=formRoomsSelect.children;
const formGuestsSelect = document.querySelector('select[name="capacity"]');
const formGuestsOptions=formGuestsSelect.children;

const formTypeSelect=offerForm.querySelector('select[name="type"]');


const formArrivalTimeSelect=offerForm.querySelector('select[name="timein"]');
const formArrivalTimeOptions=formArrivalTimeSelect.children;
const timeInMassive=Array.from(formArrivalTimeOptions).map((option)=>option.value);

const formLeavingTimeSelect=offerForm.querySelector('select[name="timeout"]');
const formLeavingTimeOptions=formLeavingTimeSelect.children;
const timeOutMassive=Array.from(formLeavingTimeOptions).map((option)=>option.value);

// Начало функций соответствия для селектов

const disableWrongGuests=() => {
  for (let ind=0; ind<formGuestsOptions.length; ind++) {
    const rooms=formRoomsSelect.value;
    const mas=GUESTS_TO_ROOMS[rooms];
    formGuestsOptions[ind].removeAttribute('disabled', 'disabled');
    if (mas.indexOf(Number(formGuestsOptions[ind].value)) === -1) {
      formGuestsOptions[ind].setAttribute('disabled', 'disabled');
    } else {
      formGuestsSelect.value=mas[0];
    }
  }
};

formRoomsSelect.addEventListener('change', disableWrongGuests);

const returnPlaceholder = () => {
  const type=formTypeSelect.value;
  for (const key in PRICE_DEPEND_ON_TYPE) {
    if (type===key) {
      formPriceInput.placeholder=PRICE_DEPEND_ON_TYPE[type];
    }
  }
};

formTypeSelect.addEventListener('change',returnPlaceholder);

const returnLeavingTime=()=> {
  Array.from(formLeavingTimeOptions).forEach((option)=> {
    const timein=formArrivalTimeSelect.value;
    option.removeAttribute('disabled', 'disabled');
    if (timein.indexOf(option.value) === -1) {
      option.setAttribute('disabled', 'disabled');
    } else {
      formLeavingTimeSelect.value=timein;
    }
  });
};

formArrivalTimeSelect.addEventListener('change',returnLeavingTime);

// Конец функций соответствия для селектов

// Начало блока с валидацией

const checkTitleValidity= ()=> {
  const valueLength = formTitleInput.value.length;
  let isCorrect=false;
  if (valueLength < MIN_TITLE_LENGTH) {
    const symbolsRemain=MIN_TITLE_LENGTH-valueLength;
    formTitleInput.setCustomValidity(`Нужно ввести еще ${symbolsRemain} ${getDeclension(symbolsRemain,SYMBOLS_DICT)}`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    formTitleInput.setCustomValidity('Имя не должно превышать 100-а символов');
  } else {
    isCorrect=true;
    formTitleInput.setCustomValidity('');
  }
  formTitleInput.reportValidity();
  return isCorrect;
};

formTitleInput.addEventListener('input', checkTitleValidity);

const checkPriceValidity= ()=> {
  const price=Number(formPriceInput.placeholder);
  let isCorrect=false;
  if (formPriceInput.value > MAX_PRICE_VALUE) {
    formPriceInput.setCustomValidity('Значение не должно превышать 1000000');
  } else if (formPriceInput.value < 0) {
    formPriceInput.setCustomValidity('Значение не должно быть отрицательным');
  } else if (formPriceInput.value < price && formPriceInput.value >= 0) {
    formPriceInput.setCustomValidity(`Значение не должно быть меньше ${price}`);
  } else {
    isCorrect=true;
    formPriceInput.setCustomValidity('');
  }
  formPriceInput.reportValidity();
  return isCorrect;
};


formPriceInput.addEventListener('input', checkPriceValidity);

const checkRoomsValidity=()=> {
  let isCorrect=false;
  for (let ind=0; ind<formRoomsOptions.length; ind++) {
    const rooms=formRoomsSelect.value;
    if (rooms === formRoomsOptions[ind].value) {
      isCorrect=true;
      return isCorrect;
    }
  }
  return isCorrect;
};

const checkGuestsValidity=()=> {
  let isCorrect=false;
  for (let ind=0; ind<formGuestsOptions.length; ind++) {
    const guests=formGuestsSelect.value;
    if (guests ===formGuestsOptions[ind].value) {
      isCorrect=true;
      return isCorrect;
    }
  }
  return isCorrect;
};


const checkArrivalTimeValidity=()=> {
  let isCorrect=false;
  timeInMassive.forEach((element)=> {
    const timein=formArrivalTimeSelect.value;
    if (timein===element) {
      isCorrect=true;
      formArrivalTimeSelect.setCustomValidity('');
      return isCorrect;
    }
  });
  formArrivalTimeSelect.setCustomValidity('Неправильно выбрано время заезда');
  return isCorrect;
};

const checkLeavingTimeValidity=()=> {
  let isCorrect=false;
  timeOutMassive.forEach((element)=> {
    const timeout=formLeavingTimeSelect.value;
    if (timeout===element) {
      isCorrect=true;
      formLeavingTimeSelect.setCustomValidity('');
      return isCorrect;
    }
  });
  formLeavingTimeSelect.setCustomValidity('Неправильно выбрано время выезда');
  return isCorrect;
};


// Конец блока с валидацией

const formatAddressInput=(lat,lng)=>{
  formAddressInput.value=`${lat},${lng}`;
};

const getCurrentAddress=(evt)=> {
  const currentPoint =evt.target.getLatLng();
  formatAddressInput(currentPoint.lat.toFixed(5),currentPoint.lng.toFixed(5));
};

formatAddressInput(DEFAULT_MAIN_POSITION.lat,DEFAULT_MAIN_POSITION.lng);

marker.on('moveend',getCurrentAddress);


const resetForms = ()=> {
  offerForm.reset();
  mapFilters.reset();
  drawOnMap(getFilteredAdArray());
  marker.setLatLng(DEFAULT_MAIN_POSITION);
  formatAddressInput(DEFAULT_MAIN_POSITION.lat,DEFAULT_MAIN_POSITION.lng);
  returnPlaceholder();
};

const enableForm = () => {
  offerForm.classList.remove('ad-form--disabled');
  resetDisabled(offerAddFormElement);
  resetButton.addEventListener('click', resetForms);
};


const onSuccessModalClose = (evt) => {
  evt.preventDefault();

  if (isEscEvent(evt) || evt.target === showSuccess) {
    showSuccess.classList.add('hidden');
    document.removeEventListener('keydown',onSuccessModalClose);
    document.removeEventListener('click',onSuccessModalClose);
  }
};

const showSuccessModal=() => {
  document.body.appendChild(showSuccess);
  showSuccess.classList.remove('hidden');
  document.addEventListener('keydown',onSuccessModalClose);
  document.addEventListener('click',onSuccessModalClose);
};

const onErrorModalClose = (evt) => {
  evt.preventDefault();

  if (isEscEvent(evt) || evt.target === showError || evt.target===closeMessageWithError ) {
    showError.classList.add('hidden');
    document.removeEventListener('keydown',onErrorModalClose);
    document.removeEventListener('click',onErrorModalClose);
    closeMessageWithError.removeEventListener('click', onErrorModalClose);
  }
};

const showErrorModal = () => {
  document.body.appendChild(showError);
  showError.classList.remove('hidden');
  document.addEventListener('keydown',onErrorModalClose);
  document.addEventListener('click',onErrorModalClose);
  closeMessageWithError.addEventListener('click', onErrorModalClose);
};

const showSuccessfulSubmition = () => {
  showSuccessModal();
  resetForms();
};

const showUnsuccessfulSubmition = () => {
  showErrorModal();
};

function checkAllFormValidity () {
  let isCorrect=true;
  if (!checkTitleValidity() || !checkPriceValidity() || !checkRoomsValidity() || !checkGuestsValidity() || !checkArrivalTimeValidity() || !checkLeavingTimeValidity()) {
    isCorrect=false;
  }
  return isCorrect;
}

const submitUserForm =(onSuccess,onFail)=>{
  offerForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (checkAllFormValidity()) {
      sendOffer(
        ()=>onSuccess(),
        ()=>onFail(),
        new FormData(evt.target),
      );
    }
  });
};

export {enableForm,showSuccessfulSubmition,showUnsuccessfulSubmition,submitUserForm,resetButton,resetForms};
