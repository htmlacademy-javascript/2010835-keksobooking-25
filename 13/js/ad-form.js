import {validate} from './ad-form-validator.js';
import {initPriceSlider, priceSliderSetValue} from './price-slider.js';
import {INITIAL_LOCATION} from './global-constants.js';
import {sendData} from './send-request-data.js';
import { showSuccessMessage, showErrorMessage } from './send-data-message-manager.js';

const ADDRESS_INPUT_DEFAULT_VALUE = `${INITIAL_LOCATION.lat}, ${INITIAL_LOCATION.lng}`;


//#region ЭЛЕМЕНТЫ ФОРМЫ
const form = document.querySelector('.ad-form');
const priceInput = form.querySelector('#price');
const addressInput = form.querySelector('#address');
const adFormSubmitButton = form.querySelector('.ad-form__submit');
const adFormResetButton = form.querySelector('.ad-form__reset');
//#endregion

//ФУНКЦИЯ ОБРАТНОГО ВЫЗОВА ОТПРАВКИ ДАННЫХ ФОРМЫ
let _onFormReset = null;

//ИНИЦИАЛИЗАЦИЯ ФОРМЫ ОБЪЯВЛЕНИЯ
const adFormInit = (onFormReset) => {
  if(!onFormReset){
    throw 'Не задана функция обратного вызова onFormReset';
  }

  _onFormReset = onFormReset;

  initPriceSlider({
    inputField: priceInput,
  });

  addressInput.value = `${INITIAL_LOCATION.lat}, ${INITIAL_LOCATION.lng}`;
};

//СБРОС ПОЛЕЙ ФОРМЫ ОБЪЯВЛЕНИЯ НА ЗНАЧЕНИЯ ПО УМОЛЧАНИЮ
const resetAdFormData = () => {
  form.reset();
  addressInput.value = ADDRESS_INPUT_DEFAULT_VALUE;
  priceSliderSetValue(priceInput.value);
  _onFormReset();
};

const disableSubmitButton = () => {
  adFormSubmitButton.disabled = true;
};

const enableSubmitButton = () => {
  adFormSubmitButton.disabled = false;
};

//ИНИЦИАЛИЗАЦИЯ СОБЫТИЯ ФОРМЫ SUBMIT
form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = validate();

  if(isValid){
    const adFormData = new FormData(evt.target);
    sendData(adFormData,
      () => {
        showSuccessMessage(enableSubmitButton);
        disableSubmitButton();
        resetAdFormData();
        _onFormReset();
      },
      () => {
        showErrorMessage(enableSubmitButton);
        disableSubmitButton();
      });
  }
});

//ИНИЦИАЛИЗАЦИЯ СОБЫТИЯ КЛИКА НА КНОПКЕ ФОРМЫ "ОЧИСТИТЬ"
adFormResetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetAdFormData();
});

export {adFormInit};
