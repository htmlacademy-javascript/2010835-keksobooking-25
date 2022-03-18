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

const getRandomArrayElement = (elements) => elements[getRandomInt(0, elements.length - 1)];

const getRandomArrayElements = (array) => {
  const result = [];
  const quantity = getRandomInt(1, array.length);
  let count = 0;

  while(count < quantity){
    const element = array[getRandomInt(0, array.length - 1)];
    if(result.includes(element)){
      continue;
    }

    result.push(element);

    count++;
  }

  return result;
};

export {getRandomInt, getRandomFloat, getRandomArrayElement, getRandomArrayElements};
