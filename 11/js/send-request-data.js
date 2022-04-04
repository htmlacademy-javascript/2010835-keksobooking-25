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
      if(data && data.length > 0){
        onSuccess(data);
      }
      else{
        throw new Error('Данные полученные с сервера не валидны');
      }
    })
    .catch((error) => {
      throw error.message;
    });
};

const sendData = (data, onSuccess, onError) => {
  fetch(
    SEND_DATA_URL,
    {
      method: 'POST',
      body: data,
    }
  )
    .then((response) => {
      if(response.ok){
        onSuccess();
      }
      else{
        onError();
      }
    })
    .catch((error) => {
      onError();
      throw error.message;
    });
};

export {requestData, sendData};
