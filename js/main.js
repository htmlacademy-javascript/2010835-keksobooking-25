import { adFormInit } from './ad-form.js';
import { requestData } from './send-request-data.js';
import { adFormDisable, filterFormDisable, adFormEnable, filterFormEnable } from './forms-enabler.js';
import { createMap, resetMap, renderAdMarkers } from './map.js';
import { setFormFilterChanged, formFilterReset } from './form-filter.js';
import { initDataStore } from './data-store.js';
import { debounce } from './util.js';

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
  setFormFilterChanged(
    debounce(() => renderAdMarkers(), 500)
  );
  renderAdMarkers();
};

//ИНИЦИАЛИЗИРУЕМ КАРТУ
createMap(() => {
  adFormEnable();
  requestData(onSuccess);
});

