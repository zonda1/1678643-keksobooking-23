/* eslint-disable no-console */
import { showAlert } from './utils.js';
// import {createObject} from './create-data.js';
import {showSuccessfulSubmition,showUnsuccessfulSubmition,submitUserForm} from './form.js';
import {drawOnMap,enableForm} from './map.js';
import {getOffers} from './fetch.js';
import {activateFilter} from './filter.js';
// import {changeFilter} from './filter.js';

const MAX_OFFERS_QUANTITY = 10;
// const offersNearby = new Array(OFFERS_QUANTITY).fill(null).map(() => createObject());
// const mapCanvas = document.querySelector('.map__canvas');
// console.log(offersNearby);
// drawElements(mapCanvas, offersNearby);

let offers=[];

getOffers(
  (resolve) => {
    console.log(resolve);
    offers=resolve;
    drawOnMap(offers);
    activateFilter(offers);
    enableForm();
    // changeFilter(offers);
  },
  (reject) => {
    console.log(reject);
    showAlert('Не удалось загрузить данные с сервера');
  });

submitUserForm(showSuccessfulSubmition,showUnsuccessfulSubmition);

// drawOnMap(offersNearby);
