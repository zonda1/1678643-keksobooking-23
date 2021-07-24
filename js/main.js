import { showAlert } from './utils.js';
import {enableForm,showSuccessfulSubmition,showUnsuccessfulSubmition,submitUserForm} from './form.js';
import {drawOnMap,initMap} from './map.js';
import {getOffers} from './fetch.js';
import {mapFilters,activateFilter,getFilteredAdArray} from './filter.js';
import {debounce} from './utils/debounce.js';
import './preview.js';

const RERENDER_DELAY = 500;

let offers=[];

getOffers(
  (resolve) => {
    offers=resolve;
    activateFilter(offers);
    initMap();
    drawOnMap(getFilteredAdArray());
    enableForm();
    mapFilters.addEventListener('change',debounce(() => {
      drawOnMap(getFilteredAdArray());
    },RERENDER_DELAY));
  },
  () => {
    showAlert('Не удалось загрузить данные с сервера');
  });

submitUserForm(showSuccessfulSubmition,showUnsuccessfulSubmition);
