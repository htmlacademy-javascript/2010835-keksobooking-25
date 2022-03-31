import { markersInit } from './marker-creator.js';
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
let _data = null;

const resetMap = () => {
  markersLayer.remove();
  markersLayer = L.layerGroup().addTo(map);
  markersInit(_data, markersLayer);
  map.setView({
    lat: INITIAL_LOCATION.lat,
    lng: INITIAL_LOCATION.lng,
  }, ZOOM_LEVEL);
};

const createMap = (data, onMapLoad) => {
  _data = data;
  initMap(onMapLoad);
  markersInit(data, markersLayer);
};

export {createMap, resetMap};
