import {getRandomInt, getRandomFloat, getRandomArrayElement, getRandomArrayElements} from './util.js';

const TYPE = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const TIME_VALUES = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];
const LAT_MIN_VALUE = 35.65;
const LAT_MAX_VALUE = 35.7;
const LNG_MIN_VALUE = 139.7;
const LNG_MAX_VALUE = 139.8;
const MIN_ROOMS_NUMBER = 1;
const MAX_ROOMS_NUMBER = 5;
const MIN_GUESTS_NUMBER = 1;
const MAX_GUESTS_NUMBER = 10;
const MIN_PRICE = 1000;
const MAX_PRICE = 10000;
const LOCATION_DECIMAL_PLACES = 5;
const ADVERTISEMENTS_COUNT = 10;


const createAuthor = (index) => ({
  avatar: `img/avatars/user${String(++index).padStart(2, '0')}.png`,
});

const createLocation = () => ({
  lat: getRandomFloat(LAT_MIN_VALUE, LAT_MAX_VALUE, LOCATION_DECIMAL_PLACES),
  lng: getRandomFloat(LNG_MIN_VALUE, LNG_MAX_VALUE, LOCATION_DECIMAL_PLACES)
});

const createOffer = (location = createLocation()) => ({
  title: 'Уютные апартаменты',
  address: `${location.lat}, ${location.lng}`,
  price: getRandomInt(MIN_PRICE, MAX_PRICE),
  type: getRandomArrayElement(TYPE),
  rooms: getRandomInt(MIN_ROOMS_NUMBER, MAX_ROOMS_NUMBER),
  guests: getRandomInt(MIN_GUESTS_NUMBER, MAX_GUESTS_NUMBER),
  checkin: getRandomArrayElement(TIME_VALUES),
  checkout: getRandomArrayElement(TIME_VALUES),
  features: getRandomArrayElements(FEATURES),
  description: 'Просторные апартаменты с видом на город',
  photos: getRandomArrayElements(PHOTOS),
});

const createAdvertisement = (element, index) => {
  const location = createLocation();

  return {
    author: createAuthor(index),
    offer: createOffer(location),
    location,
  };
};

export {createAdvertisement};
export {ADVERTISEMENTS_COUNT};

