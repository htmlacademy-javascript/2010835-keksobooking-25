const adForm = document.querySelector('.ad-form');
const adFormchildren = adForm.children;

const mapFiltersForm = document.querySelector('.map__filters');
const mapFiltersFormChildren = mapFiltersForm.children;

//SET ACTIVE PAGE STATE
const activateForm = () => {
  for(let i = 0; i < adFormchildren.length; i++){
    adFormchildren[i]['disabled'] = false;
  }

  for(let i = 0; i < mapFiltersFormChildren.length; i++){
    mapFiltersFormChildren[i]['disabled'] = false;
  }

  adForm.classList.remove('ad-form--disabled');
  mapFiltersForm.classList.remove('ad-form--disabled');
};

//SET INACTIVE PAGE STATE
const deactivateForm = () => {
  for(let i = 0; i < adFormchildren.length; i++){
    adFormchildren[i]['disabled'] = true;
  }

  for(let i = 0; i < mapFiltersFormChildren.length; i++){
    mapFiltersFormChildren[i]['disabled'] = true;
  }

  adForm.classList.add('ad-form--disabled');
  mapFiltersForm.classList.add('ad-form--disabled');
};


export {activateForm, deactivateForm};
