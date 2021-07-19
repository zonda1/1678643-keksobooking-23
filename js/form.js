import {getDeclension,resetDisabled,isEscEvent} from './utils.js';
import {sendOffer} from './fetch.js';
import {DEFAULT_MAIN_POSITION, marker} from './map.js';
import { mapFilters} from './filter.js';

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

const offerForm=document.querySelector('.ad-form');
const offerAddFormElement=offerForm.querySelectorAll('.ad-form__element');

const sendWithSuccess=document.querySelector('#success').content.querySelector('.success');
const showSuccess=sendWithSuccess.cloneNode(true);

const sendWithError=document.querySelector('#error').content.querySelector('.error');
const showError=sendWithError.cloneNode(true);
const closeMessageWithError=showError.querySelector('.error__button');

const formAddressInput=offerForm.querySelector('input[id="address"]');
const resetButton=offerForm.querySelector('.ad-form__reset');

const formTitleInput = document.querySelector('input[id="title"]');
const formPriceInput = document.querySelector('input[name="price"]');
const formRoomsSelect = document.querySelector('select[name="rooms"]');
const formGuestsSelect = document.querySelector('select[name="capacity"]');

const formGuestsOptions=formGuestsSelect.children;

const formTypeSelect=offerForm.querySelector('select[name="type"]');


const formArrivalTimeSelect=offerForm.querySelector('select[name="timein"]');
const formLeavingTimeSelect=offerForm.querySelector('select[name="timeout"]');


const GUESTS_TO_ROOMS = {
  '1': [1],
  '2': [1, 2],
  '3': [1, 2, 3],
  '100': [0],
};


// Начало функций соответствия для селектов

const disableWrongGuests=() => {
  for (let i=0; i<formGuestsOptions.length; i++) {
    const rooms=formRoomsSelect.value;
    const mas=GUESTS_TO_ROOMS[rooms];
    formGuestsOptions[i].removeAttribute('disabled', 'disabled');
    if (mas.indexOf(Number(formGuestsOptions[i].value)) === -1) {
      formGuestsOptions[i].setAttribute('disabled', 'disabled');
    } else {
      formGuestsSelect.value=mas[0];
    }
  }
};

formRoomsSelect.addEventListener('change', disableWrongGuests);

const returnPlaceholder = () => {
  const type=formTypeSelect.value;
  for (let key in PRICE_DEPEND_ON_TYPE) {
    if (type===key) {
      formPriceInput.placeholder=PRICE_DEPEND_ON_TYPE[type];
    }
  }
};

formTypeSelect.addEventListener('change',returnPlaceholder);


const returmleavingTime=()=> {
  const timein=formArrivalTimeSelect.value;
  formLeavingTimeSelect.childNodes.forEach((option)=> {
    if (timein.indexOf(option.value) !== -1) {
      formLeavingTimeSelect.value=timein;
    }
  });
};

formArrivalTimeSelect.addEventListener('change',returmleavingTime);

// Конец функций соответствия для селектов

// Начало блока с валидацией

formTitleInput.addEventListener('input', () => {
  const valueLength = formTitleInput.value.length;
  if (valueLength < MIN_TITLE_LENGTH) {
    const symbolsRemain=MIN_TITLE_LENGTH-valueLength;
    formTitleInput.setCustomValidity(`Нужно ввести еще ${symbolsRemain} ${getDeclension(symbolsRemain,SYMBOLS_DICT)}`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    formTitleInput.setCustomValidity('Имя не должно превышать 100-а символов');
  } else {
    formTitleInput.setCustomValidity('');
  }
  formTitleInput.reportValidity();
});

formPriceInput.addEventListener('input', () => {
  const price=Number(formPriceInput.placeholder);
  if (formPriceInput.value > MAX_PRICE_VALUE) {
    formPriceInput.setCustomValidity('Значение не должно превышать 1000000');
  } else if (formPriceInput.value < 0) {
    formPriceInput.setCustomValidity('Значение не должно быть отрицательным');
  } else if (formPriceInput.value < price && formPriceInput.value >= 0) {
    formPriceInput.setCustomValidity(`Значение не должно быть меньше ${price}`);
  } else {
    formPriceInput.setCustomValidity('');
  }
  formPriceInput.reportValidity();
});


// Конец блока с валидацией

const enableForm = () => {
  offerForm.classList.remove('ad-form--disabled');
  resetDisabled(offerAddFormElement);
};


const resultInFormat=(lat,lng)=>{
  formAddressInput.value=`${lat},${lng}`;
};

const getCurrentAddress=(evt)=> {
  const currentPoint =evt.target.getLatLng();
  resultInFormat(currentPoint.lat.toFixed(5),currentPoint.lng.toFixed(5));
};

resultInFormat(DEFAULT_MAIN_POSITION.lat,DEFAULT_MAIN_POSITION.lng);

marker.on('moveend',getCurrentAddress);


const returnToMainPosition=()=> {
  marker.setLatLng(DEFAULT_MAIN_POSITION);
  resultInFormat(DEFAULT_MAIN_POSITION.lat,DEFAULT_MAIN_POSITION.lng);
};


resetButton.addEventListener('click', ()=> {
  offerForm.reset();
  mapFilters.reset();
  returnToMainPosition();
});

const openModal=(obj) => {
  obj.classList.remove('hidden');
};

function closeModal (obj) {
  obj.classList.add('hidden');
  // document.removeEventListener('keydown',onSuccessModalEscKeydown);
  // document.removeEventListener('click',onSuccessModalWindowClick);
}

const onSuccessModalEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeModal(showSuccess);
  }
};

const onSuccessModalWindowClick = (evt) => {
  if (evt.target) {
    closeModal(showSuccess);
  }
};

const onErrorModalEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeModal(showError);
  }
};

const showSuccessfulSubmition = () => {
  document.body.appendChild(showSuccess);
  openModal(showSuccess);
  mapFilters.reset();
  offerForm.reset();
  returnToMainPosition();
  document.addEventListener('keydown',onSuccessModalEscKeydown);
  document.addEventListener('click',onSuccessModalWindowClick);
};

const showUnsuccessfulSubmition = () => {
  document.body.appendChild(showError);
  openModal(showError);
  closeMessageWithError.addEventListener('click', () => {
    closeModal(showError);
  });
  document.addEventListener('keydown',onErrorModalEscKeydown);
  document.addEventListener('click',(evt) => {
    if (evt.target) {
      closeModal(showError);
    }
  });
};

const submitUserForm =(onSuccess,onFail)=>{
  offerForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendOffer(
      ()=>onSuccess(),
      ()=>onFail(),
      new FormData(evt.target),
    );
  });
};

export {enableForm,showSuccessfulSubmition,showUnsuccessfulSubmition,submitUserForm,resetButton};
