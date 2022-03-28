import { markersInit } from './marker-creator.js';
import { INITIAL_LOCATION } from './initial-location.js';

const ZOOM_LEVEL = 13;

const createMap = (onMapLoad) => {
  const map = L.map('map-canvas')
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


const mapInit = (data, onMapLoad) => {
  const map = createMap(onMapLoad);
  markersInit(data, map);
};

export {mapInit};
