import {resetDisabled} from './utils.js';

const MIN_PRICE=10000;
const MAX_PRICE=50000;
const MAX_OFFERS_QUANTITY = 10;

const mapFilters=document.querySelector('.map__filters');
const mapFiltersSelect=mapFilters.children;

const selectHouseType=mapFilters.querySelector('[name="housing-type"]');
const selectHousePrice=mapFilters.querySelector('[name="housing-price"]');
const selectHouseRooms=mapFilters.querySelector('[name="housing-rooms"]');
const selectHouseGuests=mapFilters.querySelector('[name="housing-guests"]');

const checkedFeatures='[name="features"]:checked';

let ads;

const transformPriceInFilter=(price)=> {
  if (price<MIN_PRICE) {
    return 'low';}
  else if (price>=MIN_PRICE && price<=MAX_PRICE) {
    return 'middle';}
  else if (price>MAX_PRICE) {
    return 'high';}
};

const createArrayWithFeaturesChecked = () => Array.from(mapFilters.querySelectorAll(checkedFeatures)).map((checkbox) => checkbox.value);

const compareFeatures = (filterFeatures, offerFeatures) => {
  if (!Array.isArray(offerFeatures)) {
    return false;
  }
  for (let ind=0; ind < filterFeatures.length; ind++) {
    if (offerFeatures.indexOf(filterFeatures[ind]) === -1) {
      return false;
    }
  }
  return true;
};

const getFilteredAdArray = () => {
  const result=[];
  let currentAd;
  for (let ind=0; ind < ads.length; ind++) {
    currentAd=ads[ind];
    if (selectHouseType.value !== 'any' && currentAd.offer.type !== selectHouseType.value ) {
      continue;
    }
    else if (selectHousePrice.value!== 'any' && transformPriceInFilter(currentAd.offer.price) !== selectHousePrice.value ) {
      continue;
    }
    else if (selectHouseRooms.value !== 'any' && currentAd.offer.rooms !== Number(selectHouseRooms.value) ) {
      continue;
    }
    else if (selectHouseGuests.value !== 'any' && currentAd.offer.guests !== Number(selectHouseGuests.value) ) {
      continue;
    }
    else if (mapFilters.querySelectorAll(checkedFeatures).length !==0 && !compareFeatures(createArrayWithFeaturesChecked(),currentAd.offer.features)) {
      continue;
    }
    result.push(currentAd);
  }
  return result.slice(0, MAX_OFFERS_QUANTITY);
};

const activateFilter = (array) => {
  ads=array;
  mapFilters.classList.remove('map__filters--disabled');
  resetDisabled(mapFiltersSelect);
};

export {mapFilters,activateFilter,getFilteredAdArray};

