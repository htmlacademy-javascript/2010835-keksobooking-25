import'./ad-form-validator.js';
import {initPriceSlider} from './price-slider.js';
import { INITIAL_LOCATION } from './global-constants.js';

const priceInput = document.querySelector('#price');
const adressInput = document.querySelector('#address');


const adFormInit = () => {
  initPriceSlider({
    inputField: priceInput,
  });

  adressInput.value = `${INITIAL_LOCATION.lat}, ${INITIAL_LOCATION.lng}`;
};

export {adFormInit};
