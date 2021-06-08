/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable prefer-template */

const OFFERS_QUANTITY = 10;

const TITLE = 'Хорошие апартаменты';
const ADDRESS = 'location.4, location.3';
const DESCRIPTION = 'Светлые, просторные апартаменты с видом на парк';

const TYPE = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const CHECKIN = [
  '12:00',
  '13:00',
  '14:00',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];


const createOfferObject = () => {
  const randomPhotosLength = getRandomIntNumber(0, PHOTOS.length - 1);
  const newPhotosArray = PHOTOS.slice(0, randomPhotosLength + 1);
  const randomFeaturesLength = getRandomIntNumber(0, FEATURES.length - 1);
  const newFeaturesArray = FEATURES.slice(0, randomFeaturesLength + 1);
  return {
    title: TITLE,
    address: ADDRESS,
    price: getRandomIntNumber(20000, 50000),
    type: getRandomElement(TYPE),
    rooms: getRandomIntNumber(1, 7),
    guests: getRandomIntNumber(1, 5),
    checkin: getRandomElement(CHECKIN),
    checkout: getRandomElement(CHECKIN),
    features: newFeaturesArray,
    description: DESCRIPTION,
    photos: newPhotosArray,
  };
};

const createObject = () => ({
  author: {
    avatar: 'img/avatars/user0-1.png'.replace('-1', getRandomIntNumber(1, 8)),
  },
  offer: createOfferObject(),
  location: {
    lat: getRandomFracNumber(35.65000, 35.70000, 5),
    lng: getRandomFracNumber(139.70000, 139.80000, 5),
  },
});

const offersNearby = new Array(OFFERS_QUANTITY).fill(null).map(() => createObject());
console.log(offersNearby);
