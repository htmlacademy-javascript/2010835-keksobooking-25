import { createMainMarker, resetMainMarker, addAdvertisementsMarkers } from './marker-creator.js';
import { INITIAL_LOCATION } from './global-constants.js';

const ZOOM_LEVEL = 13;

const map = L.map('map-canvas');


const initMap = (onMapLoad) => {
  map
    .on('load', onMapLoad)
    .setView({
      lat: INITIAL_LOCATION.lat,
      lng: INITIAL_LOCATION.lng,
    }, ZOOM_LEVEL);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  return map;
};

let markersLayer = L.layerGroup().addTo(map);

const resetMap = () => {
  markersLayer.remove();
  markersLayer = L.layerGroup().addTo(map);
  addAdvertisementsMarkers(markersLayer);
  resetMainMarker();
  map.setView({
    lat: INITIAL_LOCATION.lat,
    lng: INITIAL_LOCATION.lng,
  }, ZOOM_LEVEL);
};

const createMap = (onMapLoad) => {
  initMap(onMapLoad);
  createMainMarker(map);
};

const createAdMarkers = (data) => {
  addAdvertisementsMarkers(markersLayer, data);
};

export {createMap, resetMap, createAdMarkers};
