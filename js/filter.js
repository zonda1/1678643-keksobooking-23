import {enableFilter,enableForm } from './map.js';

const MIN_PRICE=10000;
const MAX_PRICE=50000;

const mapFilters=document.querySelector('.map__filters');

const selectHouseType=mapFilters.querySelector('[name="housing-type"]');
const selectHousePrice=mapFilters.querySelector('[name="housing-price"]');
const selectHouseRooms=mapFilters.querySelector('[name="housing-rooms"]');
const selectHouseGuests=mapFilters.querySelector('[name="housing-guests"]');

const checkedFeatures='.map__features:checked';

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
  for (let i=0; i < filterFeatures.length; i++) {
    if (offerFeatures.indexOf(filterFeatures[i]) === -1) {
      return false;
    }
  }
};

// const compareOffer = (offerA, offerB) => {
//   const rankA = getComfortRank(offerA);
//   const rankB = getComfortRank(offerB);

//   return rankB - rankA;
// };

const getFilteredAdArray = () => {
  let result=[];
  let currentAd;
  for (let i=0; i < ads.length; i++) {
    currentAd=ads[i];
    if (selectHouseType.value !== 'any' && currentAd.offer.type !== selectHouseType.value ) {
      continue;
    }
    else if (selectHousePrice.value!== 'any' && transformPriceInFilter(currentAd.offer.price) !== selectHousePrice.value ) {
      continue;
    }
    else if (selectHouseRooms.value !== 'any' && currentAd.offer.rooms !== selectHouseRooms.value ) {
      continue;
    }
    else if (selectHouseGuests.value !== 'any' && currentAd.offer.guests !== selectHouseGuests.value ) {
      continue;
    }
    else if (mapFilters.querySelectorAll(checkedFeatures) !==0 && !compareFeatures(currentAd.offer.features,createArrayWithFeaturesChecked())) {
      continue;
    }
    result.push(currentAd);
  }
  console.log(result);
  return result;
};


const activateFilter = (array) => {
  ads=array;
  enableFilter();
  mapFilters.addEventListener('change', getFilteredAdArray);
};

// const changeFilter = (array,func) => {
//   ads=array;
//   mapFilters.addEventListener('change',()=> {
//     getFilteredAdArray();
//     func();
//   });
// };

// export {changeFilter};
export {activateFilter};

