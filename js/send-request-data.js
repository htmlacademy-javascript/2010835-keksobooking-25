const REQUEST_DATA_URL = 'https://25.javascript.pages.academy/keksobooking/data';
const SEND_DATA_URL = 'https://25.javascript.pages.academy/keksobooking';

const requestData = (onSuccess)  => {
  fetch(
    REQUEST_DATA_URL,
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((data) => {
      onSuccess(data);
    });
};

const sendData = (data, onSuccess, onError) => {
  fetch(
    SEND_DATA_URL,
    {
      method: 'POST',
      body: data,
    })
    .then((response) => {
      if(response.ok){
        onSuccess();
      }
      else{
        onError();
      }
    });
};

export {requestData, sendData};
