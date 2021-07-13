import {resetDisabled} from './utils.js';
import {getSingleElement} from './draw-elements.js';
import { getComfortRank} from './form.js';

const mapFormFilters=document.querySelector('.map__filters');
const mapFormFiltersSelect=mapFormFilters.children;
const offerAddForm=document.querySelector('.ad-form');
const offerAddFormElement=offerAddForm.querySelectorAll('.ad-form__element');

const DEFAULT_MAIN_POSITION = {
  lat:35.65283,
  lng:139.83947,
};

const map=L.map('map-canvas')
  .setView(
    DEFAULT_MAIN_POSITION,
    10);
L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'},
)
  .on('load', ()=>{
    mapFormFilters.classList.remove('map__filters--disabled');
    resetDisabled(mapFormFiltersSelect);
    offerAddForm.classList.remove('ad-form--disabled');
    resetDisabled(offerAddFormElement);
  })
  .addTo(map);

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const marker=L.marker(
  DEFAULT_MAIN_POSITION,
  {
    draggable:true,
    icon:mainPinIcon,
  },
).addTo(map);

const compareOffer = (offerA, offerB) => {
  const rankA = getComfortRank(offerA);
  const rankB = getComfortRank(offerB);

  return rankB - rankA;
};

const drawOnMap=(massive)=>{
  const newMassive=massive.map((element)=>{
    element.rank=getComfortRank();
  });
  newMassive
    .sort(compareOffer)
    .slice(0,10)
    .forEach(({location,offer,author}) => {
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
};

export {drawOnMap,DEFAULT_MAIN_POSITION,marker};
