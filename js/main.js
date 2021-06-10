/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable prefer-template */

import {createObject} from './create-object.js';

const OFFERS_QUANTITY = 10;

const offersNearby = new Array(OFFERS_QUANTITY).fill(null).map(() => createObject());
console.log(offersNearby);
