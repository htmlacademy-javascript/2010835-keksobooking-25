import { adFormInit } from './ad-form.js';
import { requestData } from './send-request-data.js';
import { userControlOff, userControlOn } from './user-control-on-off-switcher.js';
import { createMap, resetMap } from './map.js';


userControlOff();

adFormInit(resetMap);

const onSuccess = (data) => {
  createMap(data, userControlOn);
};

requestData(onSuccess);

