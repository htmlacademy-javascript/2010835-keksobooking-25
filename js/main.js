import { adFormInit } from './ad-form.js';
import { generateRandomAdvertisementsData } from './data.js';
import { userControlOff, userControlOn } from './user-control-on-off-switcher.js';
import { mapInit } from './map-creator.js';

userControlOff();

adFormInit();

mapInit(generateRandomAdvertisementsData(), userControlOn);
