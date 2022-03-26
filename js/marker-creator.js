import { INITIAL_LOCATION } from './initial-location.js';
import { createRandomAdvertisementCard } from './cards-generator.js';

//СОЗДАЁМ ИКОНКИ МАРКЕРОВ КАРТЫ
const markerIcon = L.icon({
  iconUrl: '../img/pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainMarkerIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const markerMoveEndHandler = (evt) => {
  const adressInput = document.querySelector('#address');
  const address = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
  adressInput.value = address;
};

//ФУНКЦИЯ СОЗДАЮЩАЯ ЭКЗЕМПЛЯР ГЛАВНОГО МАРКЕРА
const addMainMarker = (map) => {
  const marker = L.marker(
    {
      lat: INITIAL_LOCATION.lat,
      lng: INITIAL_LOCATION.lng,
    },
    {
      draggable: true,
      icon: mainMarkerIcon,
    }
  );

  marker.addTo(map);

  return marker;
};

//ФУНКЦИЯ ДЛЯ СОЗДАНИЯ ЭКЗЕМПЛЯРА МАРКЕРА
const addMarker = (location, map, popupTemplate) => {

  const marker = L.marker(
    {
      lat: location.lat,
      lng: location.lng
    },
    {
      draggable: false,
      icon: markerIcon,
    }
  );

  marker.addTo(map).bindPopup(popupTemplate);

  return marker;
};

//ДОБАВЛЯЕМ МАРКЕРЫ НА КАРТУ
const addAdvertisementsMarkers = (_data, _map) => {
  _data.forEach((element) => {
    addMarker({lat: element.location.lat, lng: element.location.lng}, _map, createRandomAdvertisementCard(element)); //Сюда передавать уже массив с разметкой
  });
};

const markersInit = (_data, _map) => {
  const mainMarker = addMainMarker(_map);
  mainMarker.on('moveend', markerMoveEndHandler);
  addAdvertisementsMarkers(_data, _map);
};

export {markersInit};
