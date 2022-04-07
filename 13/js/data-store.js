let _data = null;

const initDataStore = (data) => {
  _data = data;
};

const getData = () => _data;

export {initDataStore, getData};
