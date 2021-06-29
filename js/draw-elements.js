/* eslint-disable prefer-template */
import {getDeclension} from './utils.js';
import {typeCaption} from './create-data.js';

const ROOMS_DICT={
  one: 'комната',
  several:'комнаты',
  many:'комнат',
};

const GUESTS_DICT={
  one: 'гостя',
  several:'гостей',
  many:'гостей',
};

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const getSingleElement = ({
  offer,
  author,
}) => {
  const offerElement = cardTemplate.cloneNode(true);
  offerElement.querySelector('.popup__title').textContent = offer.title;
  offerElement.querySelector('.popup__text--address').textContent = offer.address;
  offerElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  offerElement.querySelector('.popup__type').textContent = typeCaption[offer.type];
  offerElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} ${getDeclension(offer.rooms,ROOMS_DICT)} для ${offer.guests} ${getDeclension(offer.guests,GUESTS_DICT)}`;
  offerElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  offerElement.querySelector('.popup__features').innerHTML = offer.features;
  offerElement.querySelector('.popup__description').textContent = offer.description;
  offerElement.querySelector('.popup__avatar').src = author.avatar;

  return offerElement;
};

const drawElements = function (container, elements) {
  elements.forEach((item) => {
    container.appendChild(getSingleElement(item));
  });
};

export {drawElements,getSingleElement};
