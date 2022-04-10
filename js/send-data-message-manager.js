import { isEscapeKey } from './util.js';

const body = document.querySelector('body');

const successMessageTemplate = document.querySelector('#success').content;
const successMessageBlock = successMessageTemplate.querySelector('.success');

const errorMessageTemplate = document.querySelector('#error').content;
const errorMessageBlock = errorMessageTemplate.querySelector('.error');
const tryAgainButton = errorMessageBlock.querySelector('button');

//#region УПРАВЛЕНИЕ ЭКРАНОМ СООБЩЕНИЯ, ИНФОРМИРУЮЩЕМ О УСПЕШНОЙ ОТПРАВКЕ ДАННЫХ
let onSuccessMessageRemove = () => {};


const onSuccessScreenEscKeydown = (evt) => {                          //ОБРАБОТЧИК НАЖАТИЯ НА КЛАВИШУ ESC
  if(isEscapeKey(evt)){
    removeSuccessMessage();
  }
};

const showSuccessMessage = (onSuccessMessageRemoveCallback) => {      //ПОКАЗАТЬ ЭКРАН С СООБЩЕНИЕМ ОБ УСПЕШНОЙ ОТПРАВКЕ ДАННЫХ (ФУНКЦИЯ ПРЕДСТАВЛЯЮЩАЯ ИНТЕРФЕЙС МОДУЛЯ)
  onSuccessMessageRemove = onSuccessMessageRemoveCallback;
  body.insertAdjacentElement('beforeend', successMessageBlock);
  body.addEventListener('keydown', onSuccessScreenEscKeydown);
  body.addEventListener('mousedown', removeSuccessMessage);
};

function removeSuccessMessage(){                                      //СКРЫТЬ ЭКРАН С СООБЩЕНИЕМ ОБ УСПЕШНОЙ ОТПРАВКЕ ДАННЫХ
  body.removeEventListener('keydown', onSuccessScreenEscKeydown);
  body.removeEventListener('mousedown', removeSuccessMessage);
  body.removeChild(successMessageBlock);
  onSuccessMessageRemove();
}
//#endregion


//#region УПРАВЛЕНИЕ ЭКРАНОМ СООБЩЕНИЯ, ИНФОРМИРУЮЩЕМ О ВОЗНИКНОВЕНИИ ОШИБКИ ПРИ ОТПРАВКЕ ДАННЫХ
let onErrorMessageRemove = () => {};


const onErrorScreenEscKeydown = (evt) => {                              //ОБРАБОТЧИК НАЖАТИЯ НА КЛАВИШУ ESC
  if(isEscapeKey(evt)){
    removeErrorMessage();
  }
};

function removeErrorMessage(){                                          //СКРЫТЬ ЭКРАН С СООБЩЕНИЕМ О ВОЗНИКНОВЕНИИ ОШИБКИ ПРИ ОТПРАВКЕ ДАННЫХ
  body.removeChild(errorMessageBlock);
  body.removeEventListener('mousedown', removeErrorMessage);
  tryAgainButton.addEventListener('click', removeErrorMessage);
  document.addEventListener('keydown', onErrorScreenEscKeydown);
  onErrorMessageRemove();
}

const showErrorMessage = (onErrorMessageRemoveCallback) => {            //ПОКАЗАТЬ ЭКРАН С СООБЩЕНИЕМ О ВОЗНИКНОВЕНИИ ОШИБКИ ПРИ ОТПРАВКЕ ДАННЫХ (ФУНКЦИЯ ПРЕДСТАВЛЯЮЩАЯ ИНТЕРФЕЙС МОДУЛЯ)
  onErrorMessageRemove = onErrorMessageRemoveCallback;
  body.addEventListener('mousedown', removeErrorMessage);
  tryAgainButton.addEventListener('click', removeErrorMessage);
  document.addEventListener('keydown', onErrorScreenEscKeydown);
  body.insertAdjacentElement('beforeend', errorMessageBlock);
};
//#endregion


export {showSuccessMessage, showErrorMessage};

