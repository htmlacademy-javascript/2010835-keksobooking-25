import { INITIAL_LOCATION } from './initial-location.js';
import { createRandomAdvertisementCard } from './cards-generator.js';

const MARKER_ICON_WIDTH = 40;
const MARKER_ICON_HEIGHT = 40;
const MAIN_MARKER_ICON_HEIGHT = 52;
const MAINMARKER_ICON_HEIGHT = 52;
const MAX_DISPLAYED_COUNT = 10;

//СОЗДАЁМ ИКОНКИ МАРКЕРОВ КАРТЫ
const markerIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [MARKER_ICON_WIDTH, MARKER_ICON_HEIGHT],
  iconAnchor: [MARKER_ICON_WIDTH/2, MARKER_ICON_HEIGHT],
});

const mainMarkerIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [MAINMARKER_ICON_HEIGHT, MAIN_MARKER_ICON_HEIGHT],
  iconAnchor: [MAINMARKER_ICON_HEIGHT/2, MAIN_MARKER_ICON_HEIGHT],
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
};

//ДОБАВЛЯЕМ МАРКЕРЫ НА КАРТУ
const addAdvertisementsMarkers = (data, map) => {
  for(let i = 0; i < MAX_DISPLAYED_COUNT; i++){
    addMarker({lat: data[i].location.lat, lng: data[i].location.lng}, map, createRandomAdvertisementCard( data[i]));
  }
};

const markersInit = (data, map) => {
  const mainMarker = addMainMarker(map);
  mainMarker.on('moveend', markerMoveEndHandler);
  addAdvertisementsMarkers(data, map);
};

export {markersInit};
