const formTitleInput = document.querySelector('input[id="title"]');
const formPriceInput = document.querySelector('input[id="price"]');
const formRoomsSelect = document.querySelector('select[id="room_number"]');
const formGuestsSelect = document.querySelector('select[id="capacity"]');
const formGuestsOptions=formGuestsSelect.children;
const threeGuestsSelect = formGuestsSelect.querySelector(':first-child');
const twoGuestsSelect = formGuestsSelect.querySelector(':nth-child(2)');
const oneGuestsSelect = formGuestsSelect.querySelector(':nth-child(3)');
const noGuestsSelect = formGuestsSelect.querySelector(':nth-child(4)');

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE_VALUE = 1000000;

formTitleInput.addEventListener('input', () => {
  const valueLength = formTitleInput.value.length;
  if (valueLength < MIN_TITLE_LENGTH) {
    formTitleInput.setCustomValidity(`Нужно ввести еще ${MIN_TITLE_LENGTH-valueLength} символов`);
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
  } else {
    formPriceInput.setCustomValidity('');
  }
});

const disabledReset=()=> {
  for (let i=0;i<formGuestsOptions.length;i++) {
    formGuestsOptions[i].removeAttribute('disabled');
  }
};

formRoomsSelect.addEventListener('change', () => {
  if (formRoomsSelect.value==='1') {
    disabledReset();
    threeGuestsSelect.setAttribute('disabled', 'disabled');
    twoGuestsSelect.setAttribute('disabled', 'disabled');
    noGuestsSelect.setAttribute('disabled', 'disabled');
  } else if (formRoomsSelect.value==='2') {
    disabledReset();
    threeGuestsSelect.setAttribute('disabled', 'disabled');
    noGuestsSelect.setAttribute('disabled', 'disabled');
  } else if (formRoomsSelect.value==='3') {
    disabledReset();
    noGuestsSelect.setAttribute('disabled', 'disabled');
  } else if (formRoomsSelect.value==='100') {
    disabledReset();
    threeGuestsSelect.setAttribute('disabled', 'disabled');
    twoGuestsSelect.setAttribute('disabled', 'disabled');
    oneGuestsSelect.setAttribute('disabled', 'disabled');
  }
});

