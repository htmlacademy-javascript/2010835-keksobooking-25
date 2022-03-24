const adForm = document.querySelector('.ad-form');
const adFormFieldset = document.querySelectorAll('.ad-form__element');

const mapFiltersForm = document.querySelector('.map__filters');
const mapFiltersFormChildren = document.querySelectorAll('.map__filter, .map__features');

const activateForm = () => {
  adFormFieldset.forEach((element) => {
    element['disabled'] = false;
  });

  mapFiltersFormChildren.forEach((element) => {
    element['disabled'] = false;
  });

  adForm.classList.remove('ad-form--disabled');
  mapFiltersForm.classList.remove('ad-form--disabled');
};

const deactivateForm = () => {
  adFormFieldset.forEach((element) => {
    element['disabled'] = true;
  });

  mapFiltersFormChildren.forEach((element) => {
    element['disabled'] = true;
  });

  adForm.classList.add('ad-form--disabled');
  mapFiltersForm.classList.add('ad-form--disabled');
};


export {activateForm, deactivateForm};
