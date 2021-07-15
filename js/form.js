import {getDeclension,resetDisabled,isEscEvent} from './utils.js';
import {sendOffer} from './fetch.js';
import {DEFAULT_MAIN_POSITION, marker} from './map.js';
const SYMBOLS_DICT={
  one: 'символ',
  several:'символа',
  many:'символов',
};

// const GUESTS_TO_ROOMS = {
//   '1': [1],
//   '2': [1, 2],
//   '3': [1, 2, 3],
//   '100': [0],
// };

const offerForm=document.querySelector('.ad-form');
const sendWithSuccess=document.querySelector('#success').content.querySelector('.success');
const showSuccess=sendWithSuccess.cloneNode(true);

const sendWithError=document.querySelector('#error').content.querySelector('.error');
const showError=sendWithError.cloneNode(true);
const closeMessageWithError=showError.querySelector('.error__button');

const formAddressInput=offerForm.querySelector('input[id="address"]');
const resetButton=offerForm.querySelector('.ad-form__reset');

const formTitleInput = document.querySelector('input[id="title"]');
const formPriceInput = document.querySelector('input[id="price"]');
const formRoomsSelect = document.querySelector('select[id="room_number"]');
const formGuestsSelect = document.querySelector('select[id="capacity"]');
const formGuestsOptions=formGuestsSelect.children;
const threeGuestsSelect = formGuestsSelect.querySelector(':first-child');
const twoGuestsSelect = formGuestsSelect.querySelector(':nth-child(2)');
const oneGuestsSelect = formGuestsSelect.querySelector(':nth-child(3)');
const noGuestsSelect = formGuestsSelect.querySelector(':nth-child(4)');

// Переменная для формы фильтрации
// const mapFilters=document.querySelector('.map__filters');

/*Переменные хранящие элементы удобств для фильтрации из DOM*/

// const selectWifiFeature=mapFilters.querySelector('.map__feature--wifi');
// const inputWifiFeature=mapFilters.querySelector('[id="filter-wifi"]');
// const selectDishwasherFeature=mapFilters.querySelector('.map__feature--dishwasher');
// const inputDishwasherFeature=mapFilters.querySelector('[id="filter-dishwasher"]');
// const selectParkingFeature=mapFilters.querySelector('.map__feature--parking');
// const inputParkingFeature=mapFilters.querySelector('[id="filter-parking"]');
// const selectWasherFeature=mapFilters.querySelector('.map__feature--washer');
// const inputWasherFeature=mapFilters.querySelector('[id="filter-washer"]');
// const selectElevatorFeature=mapFilters.querySelector('.map__feature--elevator');
// const inputElevatorFeature=mapFilters.querySelector('[id="filter-elevator"]');
// const selectConditionerFeature=mapFilters.querySelector('.map__feature--conditioner');
// const inputConditionerFeature=mapFilters.querySelector('[id="filter-conditioner"]');

//  Начало блока с валидацией

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE_VALUE = 1000000;

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
  if (formPriceInput.value > MAX_PRICE_VALUE) {
    formPriceInput.setCustomValidity('Значение не должно превышать 1000000');
  } else if (formPriceInput.value < 0) {
    formPriceInput.setCustomValidity('Значение не должно быть отрицательным');
  } else {
    formPriceInput.setCustomValidity('');
  }
  formPriceInput.reportValidity();
});


formRoomsSelect.addEventListener('change', () => {
  resetDisabled(formGuestsOptions);
  if (formRoomsSelect.value==='1') {
    threeGuestsSelect.setAttribute('disabled', 'disabled');
    twoGuestsSelect.setAttribute('disabled', 'disabled');
    noGuestsSelect.setAttribute('disabled', 'disabled');
  } else if (formRoomsSelect.value==='2') {
    threeGuestsSelect.setAttribute('disabled', 'disabled');
    noGuestsSelect.setAttribute('disabled', 'disabled');
  } else if (formRoomsSelect.value==='3') {
    noGuestsSelect.setAttribute('disabled', 'disabled');
  } else if (formRoomsSelect.value==='100') {
    threeGuestsSelect.setAttribute('disabled', 'disabled');
    twoGuestsSelect.setAttribute('disabled', 'disabled');
    oneGuestsSelect.setAttribute('disabled', 'disabled');
  }
});

// Конец блока с валидацией


// const getTotalRank =() => {
//   selectWifiFeature.addEventListener('click', ()=>{
//     inputWifiFeature.setAttribute('selected','selected');
//   });
//   selectDishwasherFeature.addEventListener('click', ()=>{
//     inputWifiFeature.setAttribute('selected','selected');
//   });
//   selectParkingFeature.addEventListener('click', ()=>{
//     inputWifiFeature.setAttribute('selected','selected');
//   });
//   selectElevatorFeature.addEventListener('click', ()=>{
//     inputWifiFeature.setAttribute('selected','selected');
//   });
//   selectWasherFeature.addEventListener('click', ()=>{
//     inputWifiFeature.setAttribute('selected','selected');
//   });
//   selectConditionerFeature.addEventListener('click', ()=>{
//     inputWifiFeature.setAttribute('selected','selected');
//   });
//   getComfortRank();
// };
// getTotalRank();

// Конец блока с фильтрацией


// const setDisabled=(obj)=> {
//   for (let i=0;i<obj.length;i++) {
//     obj[i].setAttribute('disabled','disabled');
//   }
// };

// formRoomsSelect.addEventListener('change', () => {
//   const roomQuantity=formRoomsSelect.value;
//   console.log(roomQuantity);
//   // setDisabled(formGuestsOptions);
// });


// formGuestsSelect.addEventListener('change', () => {
// console.log(GUESTS_TO_ROOMS[0]);
// });

// closeMessageWithError.addEventListener('click', () => {

// });

// const closeSuccessModal=() => {
//   showSuccess.classList.add('hidden');
// };

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
  returnToMainPosition();
});


const openModal=(obj) => {
  obj.classList.remove('hidden');
};

const closeModal=(obj) => {
  obj.classList.add('hidden');
};

const onSuccessModalEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
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
  offerForm.reset();
  returnToMainPosition();
  document.addEventListener('keydown',onSuccessModalEscKeydown);
  document.addEventListener('click',(evt) => {
    if (evt.target) {
      closeModal(showSuccess);
    }
  });
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

export {showSuccessfulSubmition,showUnsuccessfulSubmition,submitUserForm};
