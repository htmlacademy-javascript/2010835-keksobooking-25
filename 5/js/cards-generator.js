import {createAdvertisement, ADVERTISEMENTS_COUNT} from './data.js';

const template = document.querySelector('#card').content;
const cardTemplate = template.querySelector('.popup');

const randomAdvertisements = Array.from({length: ADVERTISEMENTS_COUNT}, createAdvertisement);

const translateTypeFromEngToRus = (type) => {
  switch(type){
    case 'flat':
      return 'Квартира';
    case 'bungalow':
      return 'Бунгало';
    case 'house':
      return 'Дом';
    case 'palace':
      return 'Дворец';
    case 'hotel':
      return 'Отель ';
  }
};

const createPhotosFragment = (srcList, imgTemplate) => {
  const _popupPhotosFragment = document.createDocumentFragment();

  srcList.forEach((src) => {
    const imgElement = imgTemplate.cloneNode(true);
    imgElement.src = src;
    _popupPhotosFragment.append(imgElement);
  });

  return _popupPhotosFragment;
};

const createFeaturesFragment  = (features, featuresAvailable) => {
  const featuresFragment = document.createDocumentFragment();

  features.forEach((featureItem) => {
    const isNecessary = featuresAvailable.some((featureAvailable) =>
      featureItem.classList.contains(`popup__feature--${featureAvailable}`)
    );

    if(isNecessary){
      featuresFragment.append(featureItem);
    }
  });

  return featuresFragment;
};

const cards = randomAdvertisements.map((advertisement) => {
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = advertisement.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = advertisement.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = `${String(advertisement.offer.price)} ₽/ночь`;
  cardElement.querySelector('.popup__type').textContent = translateTypeFromEngToRus(advertisement.offer.type);
  cardElement.querySelector('.popup__text--capacity').textContent = `${advertisement.offer.rooms} комнаты для ${advertisement.offer.guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${advertisement.offer.checkin}, выезд до ${advertisement.offer.checkout}`;

  const popupPhotosElement = cardElement.querySelector('.popup__photos');
  const photoElement = cardElement.querySelector('.popup__photo');
  popupPhotosElement.innerHTML  = '';
  popupPhotosElement.append(createPhotosFragment(advertisement.offer.photos, photoElement));

  const popupFeaturesElement = cardElement.querySelector('.popup__features');
  const features = cardElement.querySelectorAll('.popup__feature');
  popupFeaturesElement.innerHTML = '';
  popupFeaturesElement.append(createFeaturesFragment(features, advertisement.offer.features));

  cardElement.querySelector('.popup__description').textContent = advertisement.offer.description;

  return cardElement;
});


export {cards};
