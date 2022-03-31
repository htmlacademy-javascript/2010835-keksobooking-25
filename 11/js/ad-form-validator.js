const form = document.querySelector('.ad-form');
const price = form.querySelector('#price');
const roomNumberSelector = form.querySelector('#room_number');
const capacitySelector = form.querySelector('#capacity');
const typeSelector = form.querySelector('#type');
const timeInSelector = form.querySelector('#timein');
const timeOutSelector = form.querySelector('#timeout');

const typePriceDictionary = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__invalid',
  successClass: 'ad-form__valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'div',
  errorTextClass: 'ad-form__error'
});

const validate = () => pristine.validate();

//PRICE VALIDATION
const validatePriceMinValue = (value) => {
  price.min = typePriceDictionary[typeSelector.value];

  return +value >= +price.min;
};
const priceValidationMessage = () => `Минимальное значение поля ${typePriceDictionary[typeSelector.value]}`;
pristine.addValidator(price, validatePriceMinValue, priceValidationMessage, 10, true);


//CAPACITY VALIDATION
const validateAvailableCapacityByRoomNumber = () => {
  if(+roomNumberSelector.value === 100 && +capacitySelector.value > 0 || +roomNumberSelector.value < 100 && +capacitySelector.value === 0){
    return false;
  }

  if(+roomNumberSelector.value >= +capacitySelector.value){
    return true;
  }

  return false;
};

pristine.addValidator(capacitySelector, validateAvailableCapacityByRoomNumber, 'Недопустимое количество гостей при заданном количестве комнат');


//TIMEIN TIMEOUT SELECTORS LISTENERS
timeInSelector.addEventListener('change', () => {
  timeOutSelector.selectedIndex = timeInSelector.selectedIndex;
});

timeOutSelector.addEventListener('change', () => {
  timeInSelector.selectedIndex = timeOutSelector.selectedIndex;
});

roomNumberSelector.addEventListener('change', () => {
  pristine.validate();
});

typeSelector.addEventListener('change', () => {
  price.placeholder = typePriceDictionary[typeSelector.value];
  price.min = typePriceDictionary[typeSelector.value];
  pristine.validate();
});

export {validate};

