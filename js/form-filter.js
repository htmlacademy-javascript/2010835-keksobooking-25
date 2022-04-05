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

let _formFilterChanged = null;

const setFormFilterChanged = (formFilterChanged) => {
  _formFilterChanged = formFilterChanged;
};

const onFormFilterChanged = () => {
  _formFilterChanged();
};

const containSimilarFeature = (advertisement, inputValue) => {
  if(advertisement.offer.features){
    return advertisement.offer.features.some((feature) => feature === inputValue);
  }

  return false;
};

const filter = (data) => {
  if(housingType.value !== 'any'){
    data = data.filter((element) => element.offer.type === housingType.value);
  }

  if(housingPrice.value !== 'any'){
    data = data.filter((element) => element.offer.price >= FILTER_PRICE_RANGE[housingPrice.value].min && element.offer.price < FILTER_PRICE_RANGE[housingPrice.value].max);
  }

  if(housingRooms.value !== 'any'){
    data = data.filter((element) => element.offer.rooms === +housingRooms.value);
  }

  if(housingGuests.value !== 'any'){
    data = data.filter((element) => element.offer.guests === +housingGuests.value);
  }

  filterCheckboxes.forEach((element) => {
    if(element.checked === true){
      data = data.filter((advertisement) => containSimilarFeature(advertisement, element.value));
    }
  });

  return data;
};

const formFilterReset = () => {
  formFilter.querySelectorAll('select').forEach((element) => {element.selectedIndex = 0;});
  filterCheckboxes.forEach((element) => {element.checked = false;});
};

formFilter.addEventListener('change', onFormFilterChanged);

export { setFormFilterChanged, filter, formFilterReset };
