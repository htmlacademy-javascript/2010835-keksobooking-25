import { adFormInit } from './ad-form.js';
import { requestData } from './send-request-data.js';
import { adFormDisable, filterFormDisable, adFormEnable, filterFormEnable } from './forms-enabler.js';
import { createMap, resetMap, createAdMarkers, resetAdMarkers } from './map.js';
import { setOnFilterApply, formFilterReset } from './form-filter.js';
import { initDataStore } from './data-store.js';

//ДЕАКИТИВИРУЕМ ФОРМУ РЕГИСТРАЦИИ ОБЪЯВЛЕНИЯ И ФОРМУ ФИЛЬТРАЦИИ ДАННЫХ
adFormDisable();
filterFormDisable();

//ИНИЦИАЛИЗИРУЕМ ФОРМУ РЕГИСТРАЦИИ ОБЪЯВЛЕНИЯ
adFormInit(() => {
  formFilterReset();
  resetMap();
});

//ОБРАБОТЧИК API ФУНКЦИИ ЗАПРОСА ДАННЫХ С СЕРВЕРА
const onSuccess = (data) => {
  initDataStore(data);
  filterFormEnable();
  setOnFilterApply(resetAdMarkers);
  createAdMarkers();
};

//ИНИЦИАЛИЗИРУЕМ КАРТУ
createMap(() => {
  adFormEnable();
  requestData(onSuccess);
});

