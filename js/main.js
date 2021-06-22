/* eslint-disable no-console */
import {createObject} from './create-data.js';
// import {offersList} from './draw-elements.js';
import './form.js';

const OFFERS_QUANTITY = 1;
const offersNearby =() => new Array(OFFERS_QUANTITY).fill(null).map(() => createObject());
console.log(offersNearby());
// offersList;

export {offersNearby};
