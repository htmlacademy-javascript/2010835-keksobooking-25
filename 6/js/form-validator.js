const form = document.querySelector('.ad-form');
const price = form.querySelector('#price');
const roomNumberSelector = form.querySelector('#room_number');
const capacitySelector = form.querySelector('#capacity');
const typeSelector = form.querySelector('#type');

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


//PRICE VALIDATION
const validatePriceMinValue = (value) => value >= typePriceDictionary[typeSelector.value];
pristine.addValidator(price, validatePriceMinValue, 'Цена ниже допустимой для данного типа жилья');


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


//FORM LISTENERS
form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  pristine.validate();
});

roomNumberSelector.addEventListener('change', () => {
  pristine.validate();
});

typeSelector.addEventListener('change', () => {
  price.placeholder = typePriceDictionary[typeSelector.value];
  pristine.validate();
});

