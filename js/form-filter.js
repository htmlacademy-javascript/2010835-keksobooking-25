const formFilter = document.querySelector('.map__filters');
const housingType = formFilter.querySelector('#housing-type');
const housingPrice = formFilter.querySelector('#housing-price');
const housingRooms = formFilter.querySelector('#housing-rooms');
const housingGuests = formFilter.querySelector('#housing-guests');
const filterCheckboxes = formFilter.querySelectorAll('.map__checkbox');

const FILTER_PRICE_RANGE = {
  middle: {
    min: 10000,
    max: 50000,
  },
  low: {
    min: 0,
    max: 10000,
  },
  high: {
    min: 50000,
    max: Infinity,
  }
};

let formFilterChange = null;

const setFormFilterChanged = (formFilterChangeCallback) => {
  formFilterChange = formFilterChangeCallback;
};

const onFormFilterChange = () => {
  formFilterChange();
};

const containSimilarFeature = (advertisement, filterSelectedFeatures) => {
  if(!advertisement.offer.features){
    return false;
  }

  for(let i = 0; i < filterSelectedFeatures.length; i++){
    if(!advertisement.offer.features.includes(filterSelectedFeatures[i])){
      return false;
    }
  }

  return true;
};

const getSelectedCheckboxesValues = () => {
  const checkedCheckboxes = [];

  filterCheckboxes.forEach((checkbox) => {
    if(checkbox.checked === true){
      checkedCheckboxes.push(checkbox.value);
    }
  });

  return checkedCheckboxes;
};

const filter = (data) => {
  let result = true;

  if(housingType.value !== 'any'){
    result = data.offer.type === housingType.value;
  }

  if(housingPrice.value !== 'any'){
    result &= data.offer.price >= FILTER_PRICE_RANGE[housingPrice.value].min && data.offer.price < FILTER_PRICE_RANGE[housingPrice.value].max;
  }

  if(housingRooms.value !== 'any'){
    result &= data.offer.rooms === +housingRooms.value;
  }

  if(housingGuests.value !== 'any'){
    result &= data.offer.guests === +housingGuests.value;
  }

  const selectedCheckboxesValues = getSelectedCheckboxesValues();

  if(selectedCheckboxesValues.length !== 0){
    result &= containSimilarFeature(data, selectedCheckboxesValues);
  }


  return result;
};

const formFilterReset = () => {
  formFilter.querySelectorAll('select').forEach((element) => {element.selectedIndex = 0;});
  filterCheckboxes.forEach((element) => {element.checked = false;});
};

formFilter.addEventListener('change', onFormFilterChange);

export { setFormFilterChanged, filter, formFilterReset };

