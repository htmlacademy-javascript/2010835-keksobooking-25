import { createMainMarker, renderMainMarker, addAdvertisementsMarkers } from './marker-creator.js';
import { INITIAL_LOCATION } from './global-constants.js';
import { getData } from './data-store.js';
import { filter } from './form-filter.js';

const ZOOM_LEVEL = 13;
const MAX_DISPLAYED_COUNT = 10;

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

const createAdMarkers = () => {
  const advertisements = getData();
  const advertisementsToShow = [];
  for(let i = 0; i < advertisements.length && advertisementsToShow.length < MAX_DISPLAYED_COUNT; i++){
    if(filter(advertisements[i])){
      advertisementsToShow.push(advertisements[i]);
    }
  }

  addAdvertisementsMarkers(markersLayer, advertisementsToShow);
};

const renderAdMarkers = () => {
  markersLayer.remove();
  markersLayer = L.layerGroup().addTo(map);
  createAdMarkers(markersLayer);
};

const resetMap = () => {
  renderAdMarkers();
  renderMainMarker();
  map.setView({
    lat: INITIAL_LOCATION.lat,
    lng: INITIAL_LOCATION.lng,
  }, ZOOM_LEVEL);
};

const createMap = (onMapLoad) => {
  initMap(onMapLoad);
  createMainMarker(map);
};


export {createMap, resetMap, createAdMarkers, renderAdMarkers};
