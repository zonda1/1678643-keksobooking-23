/* eslint-disable no-console */
import {createObject} from './create-data.js';
import {getSingleElement} from './draw-elements.js';
import './form.js';
import {disabledReset} from './utils.js';

const OFFERS_QUANTITY = 4;
const offersNearby = new Array(OFFERS_QUANTITY).fill(null).map(() => createObject());
// const mapCanvas = document.querySelector('.map__canvas');
// console.log(offersNearby);
// drawElements(mapCanvas, offersNearby);

const mapFormFilters=document.querySelector('.map__filters');
const mapFormFiltersSelect=mapFormFilters.children;
const offerAddForm=document.querySelector('.ad-form');
const offerAddFormElement=offerAddForm.querySelectorAll('.ad-form__element');
const offerAddFormAddress=offerAddForm.querySelector('input[id="address"]');


const map=L.map('map-canvas')
  .setView({
    lat:35.65283,
    lng:139.83947,
  },
  10);
L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'},
)
  .on('load', ()=>{
    mapFormFilters.classList.remove('map__filters--disabled');
    disabledReset(mapFormFiltersSelect);
    offerAddForm.classList.remove('ad-form--disabled');
    disabledReset(offerAddFormElement);
    offerAddFormAddress.value=L.latLng(35.65283, 139.83947);
  })
  .addTo(map);

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const marker=L.marker(
  {
    lat:35.65283,
    lng:139.83947,
  },
  {
    draggable:true,
    icon:mainPinIcon,
  },
).addTo(map);


marker.on('moveend',(evt)=>{
  offerAddFormAddress.value=evt.target.getLatLng();
});

offersNearby.forEach(({location,offer,author}) => {
  const icon = L.icon({
    iconUrl: 'img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });
  const points = L.marker(
    location,
    {
      icon,
    },
  );
  points
    .addTo(map)
    .bindPopup(getSingleElement({offer,author}));
});
