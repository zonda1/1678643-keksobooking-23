/* eslint-disable no-console */
import {createObject} from './create-data.js';
import {drawElements} from './draw-elements.js';
import './form.js';

const OFFERS_QUANTITY = 4;
const offersNearby = new Array(OFFERS_QUANTITY).fill(null).map(() => createObject());
const mapCanvas = document.querySelector('.map__canvas');
console.log(offersNearby);
drawElements(mapCanvas, offersNearby);
