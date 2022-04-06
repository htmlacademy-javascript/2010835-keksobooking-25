import { INITIAL_LOCATION } from './global-constants.js';
import { createRandomAdvertisementCard } from './cards-generator.js';

const MARKER_ICON_WIDTH = 40;
const MARKER_ICON_HEIGHT = 40;
const MAIN_MARKER_ICON_HEIGHT = 52;
const MAINMARKER_ICON_HEIGHT = 52;


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

//СОЗДАЁМ ГЛАВНЫЙ МАРКЕР
let mainMarker = null;

const createMainMarker = (map) => {
  mainMarker = L.marker(
    {
      lat: INITIAL_LOCATION.lat,
      lng: INITIAL_LOCATION.lng,
    },
    {
      draggable: true,
      icon: mainMarkerIcon,
    }
  );

  mainMarker.on('moveend', markerMoveEndHandler);

  mainMarker.addTo(map);
};

const renderMainMarker = () => {
  mainMarker.setLatLng(
    {
      lat: INITIAL_LOCATION.lat,
      lng: INITIAL_LOCATION.lng,
    }
  );
};

//ФУНКЦИЯ ДЛЯ СОЗДАНИЯ МАРКЕРА ОБЪЯВЛЕНИЯ
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
const addAdvertisementsMarkers = (map, data) => {
  if(data){
    data.forEach((element) => {
      addMarker({lat: element.location.lat, lng: element.location.lng}, map, createRandomAdvertisementCard(element));
    });
  }
};


export {createMainMarker, renderMainMarker, addAdvertisementsMarkers};
