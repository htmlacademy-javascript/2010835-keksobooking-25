const SLIDER_MIN_VALUE = 0;
const SLIDER_START_VALUE = 0;
const SLIDER_STEP = 0;
const SLIDER_CONNECT = 'lower';

const priceSlider = document.querySelector('.ad-form__slider');


const initPriceSlider = (sliderConfigData) => {
  if(sliderConfigData.inputField === undefined){
    throw 'Не задан параметр sliderConfigData.inputField.';
  }

  const defaultSliderConfigData = {
    min: SLIDER_MIN_VALUE,
    max: +sliderConfigData.inputField.max,
    start: SLIDER_START_VALUE,
    step: SLIDER_STEP,
    connect: SLIDER_CONNECT,
  };

  sliderConfigData = Object.assign(sliderConfigData, defaultSliderConfigData);

  noUiSlider.create(priceSlider, {
    range: {
      min: sliderConfigData.min,
      max: sliderConfigData.max,
    },
    start: sliderConfigData.start,
    step: sliderConfigData.step,
    connect: sliderConfigData.connect,
    format: {
      to: (value) => value.toFixed(0),
      from: (value) => Number(value),
    }
  });

  priceSlider.noUiSlider.on('update', () => {
    sliderConfigData.inputField.value = priceSlider.noUiSlider.get();
  });

  sliderConfigData.inputField.addEventListener('input', () => {
    priceSlider.noUiSlider.set(sliderConfigData.inputField.value);
  });
};

export {initPriceSlider};
