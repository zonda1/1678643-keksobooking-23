/* eslint-disable no-console */
import { showAlert } from './utils.js';
// import {createObject} from './create-data.js';
import {enableForm,showSuccessfulSubmition,showUnsuccessfulSubmition,submitUserForm,resetButton} from './form.js';
import {drawOnMap,initMap} from './map.js';
import {getOffers} from './fetch.js';
import {mapFilters,activateFilter,getFilteredAdArray} from './filter.js';
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
    console.log(resolve.filter((item) => !Array.isArray(item.offer.features)));
    offers=resolve;
    activateFilter(offers);
    initMap();
    drawOnMap(getFilteredAdArray().slice(0, MAX_OFFERS_QUANTITY));
    enableForm();
    resetButton.addEventListener('click', ()=> {
      drawOnMap(getFilteredAdArray().slice(0, MAX_OFFERS_QUANTITY));
    });
    mapFilters.addEventListener('change', () => {
      drawOnMap(getFilteredAdArray().slice(0, MAX_OFFERS_QUANTITY));
    });
  },
  (reject) => {
    console.log(reject);
    showAlert('Не удалось загрузить данные с сервера');
  });

submitUserForm(showSuccessfulSubmition,showUnsuccessfulSubmition);
