const getRandomInt = (min, max) => {
  if(min < 0 || max < 0){
    throw 'Аргументы функции не могут быть меньше нуля.';
  }
  if(min >= max){
    throw 'Аргумент функции "min" не может быть больше или равен аргументу функции "max".';
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomFloat = (min, max, decimalPlaces) => {
  if(min < 0 || max < 0 || decimalPlaces < 0){
    throw 'Аргументы функции не могут быть меньше нуля.';
  }
  if(min >= max){
    throw 'Аргумент функции "min" не может быть больше или равен аргументу функции "max".';
  }

  return Number((Math.random() * (max - min) + min).toFixed(decimalPlaces));
};

getRandomInt(33, 42);
getRandomFloat(1.5, 4.2, 2);

