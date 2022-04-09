let data = null;

const initDataStore = (requestedData) => {
  data = requestedData;
};

const getData = () => data;

export {initDataStore, getData};
