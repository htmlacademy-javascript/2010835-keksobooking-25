const adForm = document.querySelector('.ad-form');
const adFormchildren = adForm.children;

const mapFiltersForm = document.querySelector('.map__filters');
const mapFiltersFormChildren = mapFiltersForm.children;

const adFormEnable = () => {
  for(let i = 0; i < adFormchildren.length; i++){
    adFormchildren[i]['disabled'] = false;
  }
  adForm.classList.remove('ad-form--disabled');
};

const filterFormEnable = () => {
  for(let i = 0; i < mapFiltersFormChildren.length; i++){
    mapFiltersFormChildren[i]['disabled'] = false;
  }
  mapFiltersForm.classList.remove('ad-form--disabled');
};

const adFormDisable = () => {
  for(let i = 0; i < adFormchildren.length; i++){
    adFormchildren[i]['disabled'] = true;
  }
  adForm.classList.add('ad-form--disabled');
};

const filterFormDisable = () => {
  for(let i = 0; i < mapFiltersFormChildren.length; i++){
    mapFiltersFormChildren[i]['disabled'] = true;
  }
  mapFiltersForm.classList.add('ad-form--disabled');
};


export {adFormDisable, filterFormDisable, adFormEnable, filterFormEnable};
