/* eslint-disable no-console */
import { showAlert } from './utils.js';
import {createObject} from './create-data.js';
import {showSuccessfulSubmition,showUnsuccessfulSubmition,submitUserForm} from './form.js';
import {drawOnMap} from './map.js';
import {getOffers} from './fetch.js';

const OFFERS_QUANTITY = 4;
const offersNearby = new Array(OFFERS_QUANTITY).fill(null).map(() => createObject());
// const mapCanvas = document.querySelector('.map__canvas');
// console.log(offersNearby);
// drawElements(mapCanvas, offersNearby);

getOffers(
  (resolve) => {
    console.log(resolve);
    drawOnMap(resolve.slice(0,OFFERS_QUANTITY));
  },
  (reject) => {
    console.log(reject);
    showAlert('Не удалось загрузить данные с сервера');
  });

submitUserForm(showSuccessfulSubmition,showUnsuccessfulSubmition);

// drawOnMap(offersNearby);
