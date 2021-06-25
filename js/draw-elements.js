/* eslint-disable prefer-template */
import {typeCaption} from './create-data.js';
const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const roomsForms = ['комната', 'комнаты', 'комнат'];


const roomsSuffix = function (n) {
  n = Math.abs(n) % 100;
  const n1 = n % 10;
  if (n > 10 && n < 20) {
    return roomsForms[2];
  }
  if (n1 > 1 && n1 < 5) {
    return roomsForms[1];
  }
  if (n1 === 1) {
    return roomsForms[0];
  }
  return roomsForms[2];
};

console.log(roomsSuffix(3));

const getSingleElement = ({
  offer,
  author,
}) => {
  const offerElement = cardTemplate.cloneNode(true);
  offerElement.querySelector('.popup__title').textContent = offer.title;
  offerElement.querySelector('.popup__text--address').textContent = offer.address;
  offerElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  offerElement.querySelector('.popup__type').textContent = typeCaption[offer.type];
  offerElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнат для ${offer.guests} гостей`;
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

export {
  drawElements
};
