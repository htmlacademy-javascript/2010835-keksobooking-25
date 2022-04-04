import { adFormInit } from './ad-form.js';
import { requestData } from './send-request-data.js';
import { adFormDisable, filterFormDisable, adFormEnable, filterFormEnable } from './forms-enabler.js';
import { createMap, resetMap, createAdMarkers } from './map.js';


adFormDisable();
filterFormDisable();

adFormInit(resetMap);

const onSuccess = (data) => {
  filterFormEnable();
  createAdMarkers(data);
};

createMap(() => {
  adFormEnable();
  requestData(onSuccess);
});


