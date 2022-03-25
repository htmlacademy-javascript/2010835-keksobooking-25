import {createAdvertisement, ADVERTISEMENTS_COUNT} from './data.js';
import {createRandomAdvertisementsCards} from './cards-generator.js';
import'./form-validator.js';
import {deactivateForm, activateForm} from './form-activity-switcher.js';

deactivateForm();

const randomAdvertisementsCards = createRandomAdvertisementsCards(Array.from({length: ADVERTISEMENTS_COUNT}, createAdvertisement));

const mapCanvas = document.querySelector('.map__canvas');
mapCanvas.appendChild(randomAdvertisementsCards[0]);

activateForm();
