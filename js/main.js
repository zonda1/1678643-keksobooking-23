/* eslint-disable no-console */

import { showAlert } from './utils.js';
import {enableForm,showSuccessfulSubmition,showUnsuccessfulSubmition,submitUserForm,resetButton,resetForms} from './form.js';
import {drawOnMap,initMap} from './map.js';
import {getOffers} from './fetch.js';
import {mapFilters,activateFilter,getFilteredAdArray} from './filter.js';
import {debounce} from './utils/debounce.js';

const RERENDER_DELAY = 500;

let offers=[];

getOffers(
  (resolve) => {
    offers=resolve;
    activateFilter(offers);
    initMap();
    drawOnMap(getFilteredAdArray());
    enableForm();
    resetButton.addEventListener('click', ()=> {
      resetForms();
      drawOnMap(getFilteredAdArray());
    });
    mapFilters.addEventListener('change',debounce(() => {
      drawOnMap(getFilteredAdArray());
    },RERENDER_DELAY));
  },
  (reject) => {
    console.log(reject);
    showAlert('Не удалось загрузить данные с сервера');
  });

submitUserForm(showSuccessfulSubmition,showUnsuccessfulSubmition);
