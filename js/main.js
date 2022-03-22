import'./form-validator.js';
import'./map-creator.js';
import {generateRandomAdvertisementsData} from './data.js';
import {createRandomAdvertisementCard} from './cards-generator.js';
import { deactivateForm, activateForm } from './form-activity-switcher.js';
import {addMainMarker, addMarker, createMap} from './map-creator.js';

const addAdvertisementsMarkers = (_randomData, _map) => {
  _randomData.forEach((element) => {
    addMarker({lat: element.location.lat, lng: element.location.lng}, _map, createRandomAdvertisementCard(element));
  });
};

const markerMoveEndHandler = (evt) => {
  const adressInput = document.querySelector('#address');
  const address = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
  adressInput.value = address;
};

deactivateForm();

const randomData = generateRandomAdvertisementsData();

const map = createMap(activateForm);

const marker = addMainMarker(map);
marker.on('moveend', markerMoveEndHandler);

addAdvertisementsMarkers(randomData, map);

