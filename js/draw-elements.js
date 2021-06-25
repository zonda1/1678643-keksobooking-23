/* eslint-disable prefer-template */
import {typeCaption} from './create-data.js';
const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const ROOMS_DICT={
  one: 'комната',
  several:'комнаты',
  many:'комнат',
};

const GUESTS_DICT={
  one: 'гостя',
  many:'гостей',
};


const getWordSuffix = function (num,obj) {

  if (num % 10===1 || num % 10===21) {
    return obj.one;
  }
  if (num % 10>=2 && num % 10 <= 4) {
    return obj.several;
  }
  return obj.many;
};

const getGuestsSuffix = function (num) {

  if (num % 10===1 || num % 10===21) {
    return GUESTS_DICT.one;
  }
  return GUESTS_DICT.many;
};


const getSingleElement = ({
  offer,
  author,
}) => {
  const offerElement = cardTemplate.cloneNode(true);
  offerElement.querySelector('.popup__title').textContent = offer.title;
  offerElement.querySelector('.popup__text--address').textContent = offer.address;
  offerElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  offerElement.querySelector('.popup__type').textContent = typeCaption[offer.type];
  offerElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} ${getWordSuffix(offer.rooms,ROOMS_DICT)} для ${offer.guests} ${getGuestsSuffix(offer.guests)}`;
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

export {drawElements,getWordSuffix};
