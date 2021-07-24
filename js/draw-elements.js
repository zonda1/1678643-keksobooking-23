import {getDeclension} from './utils.js';

const OFFER_IMG_WIDTH=45;
const OFFER_IMG_HEIGHT=40;

const typeCaption={
  'palace':'Дворец',
  'flat':'Квартира',
  'house':'Дом',
  'bungalow':'Бунгало',
  'hotel':'Отель',
};

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
  const featuresList=offerElement.querySelector('.popup__features');
  while (featuresList.firstChild) {
    featuresList.removeChild(featuresList.firstChild);
  }
  if (offer.features !== undefined) {
    offer.features.forEach((feature) => {
      const featureElement = document.createElement('li');
      featureElement.classList.add('popup__feature', `popup__feature--${feature}`);
      featuresList.appendChild(featureElement);
    });
  }
  offerElement.querySelector('.popup__description').textContent = offer.description;
  offerElement.querySelector('.popup__avatar').src = author.avatar;
  const photosList=offerElement.querySelector('.popup__photos');
  while (photosList.firstChild) {
    photosList.removeChild(photosList.firstChild);
  }
  if (offer.photos !== undefined) {
    offer.photos.forEach((photo)=> {
      const imgElement=document.createElement('img');
      imgElement.classList.add('popup__photo');
      imgElement.width = OFFER_IMG_WIDTH;
      imgElement.height = OFFER_IMG_HEIGHT;
      imgElement.src = photo;
      photosList.appendChild(imgElement);
    });
  }
  return offerElement;
};

const drawElements = function (container, elements) {
  elements.forEach((item) => {
    container.appendChild(getSingleElement(item));
  });
};

export {drawElements,getSingleElement};
