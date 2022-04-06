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
  if(!srcList || srcList.length <= 0){
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
  if(!featuresAvailable || featuresAvailable.length <= 0){
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

const createRandomAdvertisementCard = (advertisement) => {
  const cardElement = cardTemplate.cloneNode(true);

  //SET AVATAR
  let element = cardElement.querySelector('.popup__avatar');
  if(advertisement.author.avatar){
    element.src = advertisement.author.avatar;
  }
  else{
    setHidden(element);
  }

  //SET TITLE
  element = cardElement.querySelector('.popup__title');
  if(advertisement.offer.title){
    element.textContent = advertisement.offer.title;
  }
  else{
    setHidden(element);
  }

  //SET ADDRESS
  element = cardElement.querySelector('.popup__text--address');
  if(advertisement.offer.address){
    element.textContent = advertisement.offer.address;
  }
  else{
    setHidden(element);
  }

  //SET PRICE
  element = cardElement.querySelector('.popup__text--price');
  if(advertisement.offer.price){
    element.textContent = `${String(advertisement.offer.price)} ₽/ночь`;
  }
  else{
    setHidden(element);
  }

  //SET TYPE
  element = cardElement.querySelector('.popup__type');
  if(advertisement.offer.type){
    element.textContent = typeFromEngToRusDictionary[advertisement.offer.type];
  }
  else{
    setHidden(element);
  }

  //SET CAPACITY
  element = cardElement.querySelector('.popup__text--capacity');
  if(advertisement.offer.rooms && advertisement.offer.guests){
    element.textContent = `${advertisement.offer.rooms} комнаты для ${advertisement.offer.guests} гостей`;
  }
  else{
    setHidden(element);
  }

  //SET TIME
  element = cardElement.querySelector('.popup__text--time');
  if(advertisement.offer.checkin && advertisement.offer.checkout){
    element.textContent = `Заезд после ${advertisement.offer.checkin}, выезд до ${advertisement.offer.checkout}`;
  }
  else{
    setHidden(element);
  }

  //SET PHOTOS
  const popupPhotosElement = cardElement.querySelector('.popup__photos');
  const photoElement = cardElement.querySelector('.popup__photo');
  const photosFragment = createPhotosFragment(advertisement.offer.photos, photoElement);
  popupPhotosElement.innerHTML = '';
  if(photosFragment){
    popupPhotosElement.append(photosFragment);
  }
  else{
    setHidden(popupPhotosElement);
  }

  //SET FEATURES
  const popupFeaturesElement = cardElement.querySelector('.popup__features');
  const features = cardElement.querySelectorAll('.popup__feature');
  const featuresFragment = createFeaturesFragment(features, advertisement.offer.features);
  popupFeaturesElement.innerHTML = '';
  if(featuresFragment){
    popupFeaturesElement.append(featuresFragment);
  }
  else{
    setHidden(popupFeaturesElement);
  }

  //SET DESCRIPTION
  element = cardElement.querySelector('.popup__description');
  if(advertisement.offer.description){
    element.textContent = advertisement.offer.description;
  }
  else{
    setHidden(element);
  }

  return cardElement;

};

const createRandomAdvertisementsCards = (randomAdvertisements) => {
  const cards = randomAdvertisements.map((advertisement) => {
    const cardElement = cardTemplate.cloneNode(true);

    //SET AVATAR
    let element = cardElement.querySelector('.popup__avatar');
    if(advertisement.author.avatar){
      element.src = advertisement.author.avatar;
    }
    else{
      setHidden(element);
    }

    //SET TITLE
    element = cardElement.querySelector('.popup__title');
    if(advertisement.offer.title){
      element.textContent = advertisement.offer.title;
    }
    else{
      setHidden(element);
    }

    //SET ADDRESS
    element = cardElement.querySelector('.popup__text--address');
    if(advertisement.offer.address){
      element.textContent = advertisement.offer.address;
    }
    else{
      setHidden(element);
    }

    //SET PRICE
    element = cardElement.querySelector('.popup__text--price');
    if(advertisement.offer.price){
      element.textContent = `${String(advertisement.offer.price)} ₽/ночь`;
    }
    else{
      setHidden(element);
    }

    //SET TYPE
    element = cardElement.querySelector('.popup__type');
    if(advertisement.offer.type){
      element.textContent = typeFromEngToRusDictionary[advertisement.offer.type];
    }
    else{
      setHidden(element);
    }

    //SET CAPACITY
    element = cardElement.querySelector('.popup__text--capacity');
    if(advertisement.offer.rooms && advertisement.offer.guests){
      element.textContent = `${advertisement.offer.rooms} комнаты для ${advertisement.offer.guests} гостей`;
    }
    else{
      setHidden(element);
    }

    //SET TIME
    element = cardElement.querySelector('.popup__text--time');
    if(advertisement.offer.checkin && advertisement.offer.checkout){
      element.textContent = `Заезд после ${advertisement.offer.checkin}, выезд до ${advertisement.offer.checkout}`;
    }
    else{
      setHidden(element);
    }

    //SET PHOTOS
    const popupPhotosElement = cardElement.querySelector('.popup__photos');
    const photoElement = cardElement.querySelector('.popup__photo');
    const photosFragment = createPhotosFragment(advertisement.offer.photos, photoElement);
    popupPhotosElement.innerHTML = '';
    if(photosFragment){
      popupPhotosElement.append(photosFragment);
    }
    else{
      setHidden(popupPhotosElement);
    }

    //SET FEATURES
    const popupFeaturesElement = cardElement.querySelector('.popup__features');
    const features = cardElement.querySelectorAll('.popup__feature');
    const featuresFragment = createFeaturesFragment(features, advertisement.offer.features);
    popupFeaturesElement.innerHTML = '';
    if(featuresFragment){
      popupFeaturesElement.append(featuresFragment);
    }
    else{
      setHidden(popupFeaturesElement);
    }

    //SET DESCRIPTION
    element = cardElement.querySelector('.popup__description');
    if(advertisement.offer.description){
      element.textContent = advertisement.offer.description;
    }
    else{
      setHidden(element);
    }

    return cardElement;
  });

  return cards;
};


export {createRandomAdvertisementCard, createRandomAdvertisementsCards};
