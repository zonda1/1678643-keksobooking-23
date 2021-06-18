/* eslint-disable prefer-template */
import {offersNearby} from './create-data.js';

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const mapCanvas = document.querySelector('.map__canvas');
const offersList = offersNearby();
offersList.forEach(({offer,author}) => {
  const offerElement = cardTemplate.cloneNode(true);
  offerElement.querySelector('.popup__title').textContent=offer.title;
  offerElement.querySelector('.popup__text--address').textContent=offer.address;
  offerElement.querySelector('.popup__text--price').textContent=offer.price + ' ₽/ночь';
  offerElement.querySelector('.popup__type').textContent=offer.type;
  offerElement.querySelector('.popup__text--capacity').textContent=offer.rooms + ' комнат для ' + offer.guests + ' гостей';
  offerElement.querySelector('.popup__text--time').textContent='Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;
  offerElement.querySelector('.popup__features').innerHTML=offer.features;
  offerElement.querySelector('.popup__description').textContent=offer.description;
  offerElement.querySelector('.popup__avatar').src=author.avatar;

  mapCanvas.appendChild(offerElement);
});

export{offersList};
