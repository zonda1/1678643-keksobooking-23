
import {getSingleElement} from './draw-elements.js';


// const mapFormFilters=document.querySelector('.map__filters');

let map, layerGroup;

const DEFAULT_MAIN_POSITION = {
  lat:35.65283,
  lng:139.83947,
};

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
);

const initMap = () => {
  map=L.map('map-canvas')
    .setView(
      DEFAULT_MAIN_POSITION,
      10);
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'},
  )
    .addTo(map);
  marker.addTo(map);
};

const drawOnMap=(massive)=>{
  if (layerGroup) {
    layerGroup.clearLayers();
  }

  layerGroup = L.layerGroup().addTo(map);

  massive
    .forEach(({location,offer,author}) => {
      const icon = L.icon({
        iconUrl: 'img/pin.svg',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
      });
      const point = L.marker(
        location,
        {
          icon,
        },
      );
      point
        .addTo(layerGroup)
        .bindPopup(getSingleElement({offer,author}));
    });
};

export {drawOnMap,DEFAULT_MAIN_POSITION,marker,initMap};
