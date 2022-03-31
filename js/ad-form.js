import {validate} from './ad-form-validator.js';
import {initPriceSlider, priceSliderSetValue} from './price-slider.js';
import {INITIAL_LOCATION} from './global-constants.js';
import {sendData} from './send-request-data.js';
import { showSuccessMessage, showErrorMessage } from './send-data-message-manager.js';

const TITLE_INPUT_DEFAULT_VALUE = '';
const PRICE_INPUT_DEFAULT_VALUE = '';
const TYPE_DEFAULT_SELECTED_INDEX = 1;
const ROOM_NUMBER_DEFAULT_SELECTED_INDEX = 0;
const CAPACITY_DEFAULT_SELECTED_INDEX = 0;
const DESCRIPTION_INPUT_DEFAULT_VALUE = '';
const ADDRESS_INPUT_DEFAULT_VALUE = `${INITIAL_LOCATION.lat}, ${INITIAL_LOCATION.lng}`;
const TIME_IN_DEFAULT_SELECTED_INDEX = 0;
const TIME_OUT_DEFAULT_SELECTED_INDEX = 0;
const FEATURES_DEFAULT_VALUE = false;

//#region ЭЛЕМЕНТЫ ФОРМЫ
const form = document.querySelector('.ad-form');
const priceInput = form.querySelector('#price');
const addressInput = form.querySelector('#address');
const titleInput = form.querySelector('#title');
const typeInput = form.querySelector('#type');
const roomNumberSelector = form.querySelector('#room_number');
const capacitySelector = form.querySelector('#capacity');
const descriptionInput = form.querySelector('#description');
const timeInSelector = form.querySelector('#timein');
const timeOutSelector = form.querySelector('#timeout');
const featuresCheckboxInputs = form.querySelectorAll('.features__checkbox');
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
  titleInput.value = TITLE_INPUT_DEFAULT_VALUE;
  priceInput.value = PRICE_INPUT_DEFAULT_VALUE;
  priceSliderSetValue(priceInput.value);
  typeInput.selectedIndex = TYPE_DEFAULT_SELECTED_INDEX;
  roomNumberSelector.selectedIndex = ROOM_NUMBER_DEFAULT_SELECTED_INDEX;
  capacitySelector.selectedIndex = CAPACITY_DEFAULT_SELECTED_INDEX;
  descriptionInput.value = DESCRIPTION_INPUT_DEFAULT_VALUE;
  addressInput.value = ADDRESS_INPUT_DEFAULT_VALUE;
  timeInSelector.selectedIndex = TIME_IN_DEFAULT_SELECTED_INDEX;
  timeOutSelector.selectedIndex = TIME_OUT_DEFAULT_SELECTED_INDEX;
  featuresCheckboxInputs.forEach((checkboxInput) => {checkboxInput['checked'] = FEATURES_DEFAULT_VALUE;});
  _onFormReset();
};

const disableSubmitButton = () => {
  adFormSubmitButton['disabled'] = true;
};

const enableSubmitButton = () => {
  adFormSubmitButton['disabled'] = false;
};

//ИНИЦИАЛИЗАЦИЯ СОБЫТИЯ ФОРМЫ SUBMIT
form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = validate();

  if(isValid){
    const adFormData = new FormData(evt.target);
    sendData(adFormData, () => {
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
