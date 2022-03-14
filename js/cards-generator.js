const template = document.querySelector('#card').content;
const cardTemplate = template.querySelector('.popup');

const typeFromEngToRusDictionary = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const createPhotosFragment = (srcList, imgTemplate) => {
  if(srcList.length <= 0){
    return null;
  }

  const _popupPhotosFragment = document.createDocumentFragment();

  srcList.forEach((src) => {
    const imgElement = imgTemplate.cloneNode(true);
    imgElement.src = src;
    _popupPhotosFragment.append(imgElement);
  });

  return _popupPhotosFragment;
};

const createFeaturesFragment  = (features, featuresAvailable) => {
  if(featuresAvailable.length <= 0){
    return null;
  }

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

const setHidden = (element) => {
  element.classList.add('hidden');

  return element;
};


const createRandomAdvertisementsCards = (randomAdvertisements) => {
  const cards = randomAdvertisements.map((advertisement) => {
    const cardElement = cardTemplate.cloneNode(true);

    let element = cardElement.querySelector('.popup__avatar');
    advertisement.author.avatar ? element.src = advertisement.author.avatar : setHidden(element);

    element = cardElement.querySelector('.popup__title');
    advertisement.offer.title ? element.textContent = advertisement.offer.title : setHidden(element);

    element = cardElement.querySelector('.popup__text--address');
    advertisement.offer.address ? element.textContent = advertisement.offer.address : setHidden(element);

    element = cardElement.querySelector('.popup__text--price');
    advertisement.offer.price ? element.textContent = `${String(advertisement.offer.price)} ₽/ночь` : setHidden(element);

    element = cardElement.querySelector('.popup__type');
    advertisement.offer.type ? element.textContent = typeFromEngToRusDictionary[advertisement.offer.type] : setHidden(element);

    element = cardElement.querySelector('.popup__text--capacity');
    advertisement.offer.rooms && advertisement.offer.guests ? element.textContent = `${advertisement.offer.rooms} комнаты для ${advertisement.offer.guests} гостей` : setHidden(element);

    element = cardElement.querySelector('.popup__text--time');
    advertisement.offer.checkin && advertisement.offer.checkout ?
    element.textContent = `Заезд после ${advertisement.offer.checkin}, выезд до ${advertisement.offer.checkout}` :
    setHidden(element);

    const popupPhotosElement = cardElement.querySelector('.popup__photos');
    const photoElement = cardElement.querySelector('.popup__photo');
    const photosFragment = createPhotosFragment(advertisement.offer.photos, photoElement);
    popupPhotosElement.innerHTML = '';
    photosFragment ? popupPhotosElement.append(photosFragment) : setHidden(popupPhotosElement);

    const popupFeaturesElement = cardElement.querySelector('.popup__features');
    const features = cardElement.querySelectorAll('.popup__feature');
    const featuresFragment = createFeaturesFragment(features, advertisement.offer.features);
    popupFeaturesElement.innerHTML = '';
    featuresFragment ? popupFeaturesElement.append(featuresFragment) : setHidden(popupFeaturesElement);

    cardElement.querySelector('.popup__description').textContent = advertisement.offer.description;

    return cardElement;
  });

  return cards;
};


export {createRandomAdvertisementsCards};
