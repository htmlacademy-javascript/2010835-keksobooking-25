const priceSlider = document.querySelector('.ad-form__slider');


const initPriceSlider = (sliderConfigData) => {
  noUiSlider.create(priceSlider, {
    range: {
      min: sliderConfigData.min,
      max: sliderConfigData.max,
    },
    start: sliderConfigData.start,
    step: sliderConfigData.step,
    connect: sliderConfigData.connect,
    format: {
      to: function(value){
        return value.toFixed(0);
      },
      from: function(value){
        return Number(value);
      }
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
