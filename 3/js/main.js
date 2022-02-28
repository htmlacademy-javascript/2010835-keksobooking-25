const type = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const timeValues = ['12:00', '13:00', '14:00'];
const features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const photos = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];
const authorIds = [];
const ADVERTISEMENTS_COUNT = 10;
const AUTHOR_ID_MAX_VALUE = 10;

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

const createAuthor = () => {
  if(authorIds.length >= AUTHOR_ID_MAX_VALUE){
    throw 'Список доступных id авторов исчерпан';
  }

  let id = getRandomInt(1, AUTHOR_ID_MAX_VALUE);

  while(authorIds.includes(id)){
    id = getRandomInt(1, AUTHOR_ID_MAX_VALUE);
  }

  authorIds.push(id);

  id = id < 10 ? `0${String(id)}` : String(id);

  const avatar = `img/avatars/user${String(id)}.png`;

  return {
    avatar
  };
};

const createLocation = () => ({
  lat: getRandomFloat(35.65, 35.7, 5),
  lng: getRandomFloat(139.7, 139.8, 5),

  toString: function() { return `${this.lat}, ${this.lng}`; }
});

const createOffer = (location = createLocation()) => ({
  title: 'Уютные апартаменты',
  address: location.toString(),
  price: getRandomInt(1000, 10000),
  type: getRandomArrayElement(type),
  rooms: getRandomInt(1, 5),
  guests: getRandomInt(1, 20),
  checkin: getRandomArrayElement(timeValues),
  checkout: getRandomArrayElement(timeValues),
  features: getRandomArrayElements(features),
  description: 'Просторные апартаменты с видом на город',
  photos: getRandomArrayElements(photos),
});

const createAdvertisement = () => {
  const location = createLocation();

  return {
    author: createAuthor(),
    offer: createOffer(location),
    location,
  };
};

Array.from({length: ADVERTISEMENTS_COUNT}, createAdvertisement);

